<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

abstract class Genre
{
    /**
     * @ORM\Id
     * @ORM\Column(type="string", length=50)
     */
    private $genre;

    public function __construct($media, $genre)
    {
        $this->media = $media;
        $this->genre = $genre;
    }

    final public function getName(): string
    {
        return $this->genre;
    }
}
