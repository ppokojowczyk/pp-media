<?php

namespace App\Controller;

use App\Entity\Media;
use App\Factory;
use App\ParseImdbUrl\ParseImdbUrl;
use App\Repository\MediaFilter;
use App\Service\Importer;
use App\Service\MediaManager;
use App\Service\Statistics;
use App\Service\UploadsService;
use Error;
use Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class MediaController extends AbstractController
{
    /**
     * @var Factory
     */
    protected $Factory;

    /**
     * @var UploadsService
     */
    protected $uploadsService;

    public function __construct(Factory $Factory, UploadsService $uploadsService)
    {
        $this->Factory = $Factory;
        $this->uploadsService = $uploadsService;
    }

    public function getMediaClass(string $mediaType = ''): string
    {
        return $this->Factory->makeMediaClass($mediaType);
    }

    public function medias(string $mediaType = '', $id = '', Request $request): JsonResponse
    {
        $filters = MediaFilter::fromRequest($request);
        $Repository = $this->Factory->makeMediaRepository($mediaType);
        $data = !empty($id) ? [$Repository->find($id)] : $Repository->findWithFilters($filters);

        /**
         * @todo move to uploads controller
         * @todo implement repository/request on frontend
         */
        if ($id && isset($data[0])) {
            $this->uploadsService->addImagesToMedia($data[0]);
        }

        return $this->json(['data' => $data, 'totalCount' => count($data)]);
    }

    /**
     * @todo move to service or manager
     * @todo add type for $doctrine
     */
    private function saveNewMedia(string $mediaType, array $data, MediaManager $manager, $doctrine): Media
    {
        $mediaClass = $this->getMediaClass($mediaType);

        if (isset($data['id'])) {
            $repository = $this->Factory->makeMediaRepository($mediaType);
            $media = $repository->find($data['id']);
        } else {
            $media = new $mediaClass();
        }

        if (!$media) {
            throw new Error('Media not found/not created.');
        }

        $manager->setDataFromArray($media, $data);
        // New entry, validate.
        /** @todo maybe this should be determined different? */
        if (!$media->getId()) {
            $manager->validate($media);
        }
        $manager->save($doctrine, $media);

        return $media;
    }

    public function newMedia(string $mediaType = '', Request $Request, MediaManager $MediaManager): JsonResponse
    {
        $Response = new JsonResponse();

        try {
            $data = json_decode($Request->getContent(), true);
            $mediaClass = $this->getMediaClass($mediaType);
            $Media = new $mediaClass();
            $MediaManager->setDataFromArray($Media, $data);
            $MediaManager->validate($Media);
            $MediaManager->save($this->getDoctrine()->getManager(), $Media);
            $Response->setStatusCode(200);
            $Response->setJson(json_encode(['message' => 'Media was added.', 'id' => $Media->getId()]));
        } catch (\Exception $Exception) {
            $Response->setStatusCode(400);
            $Response->setJson(json_encode(['message' => $Exception->getMessage()]));
        }

        return $Response;
    }

    public function updateMedia(string $mediaType = '', $id = null, Request $Request, MediaManager $MediaManager): JsonResponse
    {
        $Response = new JsonResponse();

        try {
            $data = json_decode($Request->getContent(), true);
            if (!isset($id)) {
                throw new \Exception('No Media ID.');
            }
            $EntityManager = $this->getDoctrine()->getManager();
            $Media = $EntityManager->find($this->getMediaClass($mediaType), $id);
            if (!$Media) {
                throw new \Exception('Media not found.');
            }
            $MediaManager->setDataFromArray($Media, $data);
            $MediaManager->save($EntityManager, $Media);
            $Response->setJson(json_encode(['message' => 'Media was updated.', 'id' => $Media->getId()]));
            $Response->setStatusCode(200);
        } catch (\Exception $ex) {
            $Response->setStatusCode(400);
            $Response->setJson(json_encode(['message' => $ex->getMessage()]));
        }

        return $Response;
    }

    public function deleteMedia(string $mediaType = '', $id = null, Request $Request): JsonResponse
    {
        $Response = new JsonResponse();
        try {
            if (!isset($id)) {
                throw new \Exception('No Media ID.');
            }
            $EntityManager = $this->getDoctrine()->getManager();
            $Media = $EntityManager->find($this->getMediaClass($mediaType), $id);
            if (!$Media) {
                throw new \Exception('Media not found.');
            }
            $EntityManager->remove($Media);
            $EntityManager->flush();
            $Response->setStatusCode(200);
        } catch (\Exception $ex) {
            $Response->setStatusCode(500);
        }
        return $Response;
    }

    public function fetchDataFromImdb($mediaId = null, Request $Request)
    {
        $Response = new JsonResponse();
        try {
            $data = [];
            if ($mediaId) {
                $ImdbHandler = new ParseImdbUrl();
                $ImdbHandler->setMovieId($mediaId);
                $ImdbHandler->process();
                $data = $ImdbHandler->getData();
            }
            $Response->setData($data);
            $Response->setStatusCode(200);
        } catch (Exception $Exception) {
            $Response->setStatusCode(400);
        }
        return $Response;
    }

    public function statistics()
    {
        $Response = new JsonResponse();

        try {
            $data = (new Statistics($this->Factory))->allStatistics();
            $Response->setData($data);
            $Response->setStatusCode(200);
        } catch (Exception $Exception) {
            $Response->setStatusCode(400);
        }

        return $Response;
    }

    /**
     * @todo move to separate service or media manager or importer
     */
    public function batchSave(Request $request, MediaManager $manager, Importer $importer): Response
    {
        $data = json_decode($request->getContent(), true);
        $mediaType = $data['mediaType'];
        $medias = $data['medias'];
        $unsetFields = ['id', 'save'];
        $total = 0;
        $saved = 0;
        $failed = 0;
        $failedIds = [];
        $errors = [];
        $tempId = '';

        foreach ($medias as $item) {
            $tempId = $item['id'];
            try {
                if (!$item['save']) {
                    continue;
                }
                $total++;
                foreach ($unsetFields as $field) {
                    if (array_key_exists($field, $item)) {
                        unset($item[$field]);
                    }
                }
                if (isset($item['existingId'])) {
                    $item['id'] = $item['existingId'];
                }
                $importer->fillEmptyFields($item);
                $this->saveNewMedia($mediaType, $item, $manager, $this->getDoctrine()->getManager());
                $saved++;
            } catch (Exception $e) {
                $failed++;
                $failedIds[] = $tempId;
                $errors[] = sprintf("%s -> %s", $tempId, $e->getMessage());
            }
        }

        return $this->json([
            'total' => $total,
            'saved' => $saved,
            'failed' => $failed,
            'failedIds' => $failedIds,
            'errors' => $errors,
        ], 200);
    }
}
