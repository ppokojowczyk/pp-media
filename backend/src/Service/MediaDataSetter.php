<?php

namespace App\Service;

use App\Entity\MediaInterface;
use DateTime;

class MediaDataSetter
{
    /**
     * @return string[]
     */
    protected function dataKeys(): array
    {
        return [
            'toBuy',
            'title',
            'releaseDate',
            'rating',
            'genres',
            'description',
            'toListen',
            'isFavourite',
            'ignoreValidation',
            'toWatch',
            'author',
            'toRead',
            'toPlay',
            'completed',
        ];
    }

    public function set(MediaInterface $Media, array $data = []): MediaInterface
    {
        foreach ($this->dataKeys() as $key) {
            if (!array_key_exists($key, $data))
                continue;
            $value = $data[$key];
            $setter = "set" . ucfirst($key);

            if ($key === 'releaseDate')
                $value = new DateTime($value);

            if (method_exists($Media, $setter))
                $Media->$setter($value);
        }

        return $Media;
    }
}
