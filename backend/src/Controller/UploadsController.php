<?php

namespace App\Controller;

use App\Factory;
use App\Service\UploadsService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class UploadsController extends AbstractController
{
    /**
     * @var Factory
     */
    protected $Factory;

    /**
     * @var UploadsService
     */
    protected $uploadsService;

    /**
     * @param Factory $Factory
     * @param UploadsService $uploadsService
     */
    public function __construct(Factory $Factory, UploadsService $uploadsService)
    {
        $this->Factory = $Factory;
        $this->uploadsService = $uploadsService;
    }

    /**
     * @param Request $request
     * @param string $mediaType
     * @param int $id
     * 
     * @return Response
     */
    public function upload(Request $request, string $mediaType, int $id): Response
    {
        $uploads = $request->files->all();
        $remove = array_filter(explode(',', $request->get('remove') ?? ''));

        if (count($uploads)) {
            foreach ($uploads as $upload) {
                if ($upload) {
                    $this->uploadsService->saveUpload(
                        $upload,
                        $mediaType,
                        $id,
                        $this->getDoctrine()->getManager()
                    );
                }
            }
        }

        if (!empty($remove)) {
            foreach ($remove as $id) {
                $this->uploadsService->delete($id);
            }
        }

        return $this->json([
            'message' => 'Done',
        ]);
    }

    /**
     * @param int $id
     * 
     * @return Response
     */
    public function image(int $id): Response
    {
        $image = $this->uploadsService->findUpload($id);
        $path = $this->uploadsService->getUploadFilePath($image);

        return new BinaryFileResponse($path);
    }

    /**
     * @param int $id
     * 
     * @return Response
     */
    public function imageThumbnail(int $id): Response
    {
        $image = $this->uploadsService->findUpload($id);
        $response = new Response();

        if (!$this->uploadsService->thumbnailExists($image)) {
            $newThumbnail = $this->uploadsService->createThumbnail($image);
            $this->uploadsService->saveThumbnail($image, $newThumbnail);
        }

        $thumbnail = $this->uploadsService->getThumbnail($image);

        $response->headers->set('Cache-Control', 'private');
        $response->headers->set('Content-type', 'image/jpeg');
        $response->headers->set('Content-length',  strlen($thumbnail));
        $response->sendHeaders();
        $response->setContent($thumbnail);

        return $response;
    }
}
