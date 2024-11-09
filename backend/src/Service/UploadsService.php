<?php

namespace App\Service;

use App\Entity\Media;
use App\Entity\MediaType;
use App\Entity\Upload;
use App\Repository\UploadRepository;
use Doctrine\ORM\EntityManager;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class UploadsService
{
    /**
     * @var string
     */
    private $root;

    /**
     * @var EntityManagerInterface
     */
    private $entityManager;

    /**
     * @var UploadRepository
     */
    private $repository;

    /**
     * @param string $root
     * @param EntityManagerInterface $entityManager
     */
    public function __construct(string $root, EntityManagerInterface $entityManager)
    {
        $this->root = $root;
        $this->entityManager = $entityManager;
        $this->repository = new UploadRepository($entityManager, $entityManager->getClassMetadata(Upload::class));
    }

    public function addImagesToMedia(Media $media): Media
    {
        $images = $this->repository->findForMedia(
            MediaType::typeByMediaClass(get_class($media)),
            $media->getId()
        );

        if (count($images)) {
            $media->setImages($images);
        }

        return $media;
    }

    public function saveUpload(
        UploadedFile $file,
        string $mediaType,
        int $mediaId
    ): Upload {

        if (empty($mediaId)) {
            throw new Exception('Missing media id.');
        }

        if (empty($mediaType)) {
            throw new Exception('Invalid media type.');
        }

        $year = date('Y');
        $month = date('m');
        $root = $this->root . '/public/uploads/';
        $dir = $year . '/' . $month . '/';
        $name = uniqid() .  '-' . uniqid() . '.' . $file->getClientOriginalExtension();
        // $file->move($root . $dir, $name);
        $file->move($root, $name);
        // $source = $dir . $name;
        $source = $name;

        $upload = new Upload();

        $upload->setMediaType($mediaType);
        $upload->setMediaId($mediaId);
        $upload->setSource($source);
        $upload->setName($file->getClientOriginalName());

        $this->entityManager->persist($upload);
        $this->entityManager->flush();

        return $upload;
    }

    public function getUploadFilePath(Upload $upload)
    {
        return $this->root . '/public/uploads/' . $upload->getSource();
    }

    public function getThumbnailFilePath(Upload $upload)
    {
        return $this->root . '/public/thumbnails/' . $upload->getSource();
    }

    public function findUpload(int $id): Upload
    {
        return $this->repository->find($id);
    }

    public function thumbnailExists(Upload $upload): bool
    {
        return file_exists($this->getThumbnailFilePath($upload));
    }

    public function saveThumbnail(Upload $upload, $thumbnail)
    {
        $path = $this->getThumbnailFilePath($upload);
        $dir = dirname($path);

        if (!is_dir($dir)) {
            mkdir($dir, 0777, true);
        }

        file_put_contents($path, $thumbnail);
    }

    public function getThumbnail(Upload $upload)
    {
        $thumbnail = file_get_contents($this->getThumbnailFilePath($upload));

        return $thumbnail;
    }

    public function createThumbnail(Upload $upload)
    {
        $image = $this->getUploadFilePath($upload);

        if (is_file($image)) {
            /* read the source image */
            $source_image = imagecreatefromjpeg($image);
            $width = imagesx($source_image);
            $height = imagesy($source_image);

            /* find the "desired height" of this thumbnail, relative to the desired width  */
            $desired_height = floor($height * (256 / $width));

            /* create a new, "virtual" image */
            $virtual_image = imagecreatetruecolor(256, $desired_height);

            /* copy source image at a resized size */
            imagecopyresampled($virtual_image, $source_image, 0, 0, 0, 0, 256, $desired_height, $width, $height);

            /* create the physical thumbnail image */
            ob_start();
            imagejpeg($virtual_image);
            $output = ob_get_contents();
            ob_end_clean();

            return $output;
        } else {
            throw new Exception("Invalid image.");
        }
    }

    public function delete(int $id)
    {
        $upload = $this->findUpload($id);

        if (!$upload) {
            return false;
        }

        $path = $this->getUploadFilePath($upload);
        $thumbnailPath = $this->getThumbnailFilePath($upload);

        $this->entityManager->remove($upload);
        $this->entityManager->flush();

        if ($path && file_exists($path)) {
            unlink($path);
        }

        if ($thumbnailPath && file_exists($thumbnailPath)) {
            unlink($thumbnailPath);
        }

        return true;
    }
}
