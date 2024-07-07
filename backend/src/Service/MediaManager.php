<?php

namespace App\Service;

use App\Entity\MediaInterface;
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
}
