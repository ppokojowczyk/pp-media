<?php

namespace App\Controller;

use App\Factory;
use App\ParseImdbUrl\ParseImdbUrl;
use App\Service\MediaManager;
use Exception;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class MediaController extends AbstractController
{
    /**
     * @var Factory
     */
    protected $Factory;

    public function __construct(Factory $Factory)
    {
        $this->Factory = $Factory;
    }

    public function getMediaClass(string $mediaType = ''): string
    {
        return $this->Factory->makeMediaClass($mediaType);
    }

    public function medias(string $mediaType = ''): JsonResponse
    {
        $Repository = $this->Factory->makeMediaRepository($mediaType);
        $data = $Repository->findAll();
        return $this->json(['data' => $data, 'totalCount' => count($data)]);
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
            $Response->setJson(json_encode(['message' => 'Media was added']));
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
            $Response->setStatusCode(200);
        } catch (\Exception $ex) {
            $Response->setStatusCode(400);
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
}
