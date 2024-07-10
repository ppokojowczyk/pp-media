<?php

namespace App\Service;

use App\Entity\Album;
use App\Entity\Media;
use App\Entity\MediaInterface;
use App\Factory;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class MediaManager
{
    /**
     * @var ValidatorInterface
     */
    protected $validator;

    /**
     * @var MediaDataSetter
     */
    protected $MediaDataSetter;

    /**
     * @param ValidatorInterface $validator
     * @param MediaDataSetter $MediaDataSetter
     */
    public function __construct(ValidatorInterface $validator, MediaDataSetter $MediaDataSetter)
    {
        $this->validator = $validator;
        $this->MediaDataSetter = $MediaDataSetter;
    }

    /**
     * @param MediaInterface $Media
     * 
     * @return MediaInterface
     */
    public function validate(MediaInterface $Media): MediaInterface
    {
        /* Check if validation is enabled. */
        if (!$Media->getIgnoreValidation()) {
            $errors = $this->validator->validate($Media);
            if (count($errors)) {
                $errors_ = [];
                foreach ($errors as $err) {
                    $errors_[] = $err->getMessage(0);
                }
                throw new \Exception(join(' / ', $errors_));
            }
        }

        return $Media;
    }

    /**
     * @param MediaInterface $Media
     * @param array $data
     * 
     * @return MediaInterface
     */
    public function setDataFromArray(MediaInterface $Media, array $data = []): MediaInterface
    {
        return $this->MediaDataSetter->set($Media, $data);
    }

    /**
     * @param mixed $EntityManager
     * @param MediaInterface $Media
     * 
     * @return MediaInterface
     */
    public function save($EntityManager, MediaInterface $Media): MediaInterface
    {
        $EntityManager->persist($Media);
        $EntityManager->flush();
        return $Media;
    }

    /**
     * Find id of duplicate for entity.
     * @param Media $Media
     * @param string $mediaType
     * @param Factory $factory
     *
     * @return int|null
     */
    public function findDuplicateId(Media $Media, string $mediaType, Factory $factory)
    {
        $repository = $factory->makeMediaRepository($mediaType);
        $existing = null;
        $title = $Media->getTitle();
        $releaseDate = $Media->getReleaseDate();

        // Find by both.
        $existing = $repository->findOneBy([
            'title' => $title,
            'release_date' => $releaseDate,
        ]);

        // Find by title only.
        if (!$existing) {
            $existing = $repository->findOneBy([
                'title' => $title,
            ]);
        }

        /** @var Media $existing */
        if ($existing) {
            return $existing->getId();
        }

        return null;
    }
}
