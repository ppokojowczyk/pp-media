<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Incompass\TimestampableBundle\Entity\TimestampTrait;

/**
 * @ORM\Entity(repositoryClass="App\Repository\MediaRepository")
 */
class Album extends Media
{
    use TimestampTrait;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\AlbumGenre", mappedBy="album", orphanRemoval=true, cascade="persist")
     */
    protected $genres;

    /**
     * @ORM\Column(type="string", length=100)
     */
    protected $author;

    public function getGenreClass(): string
    {
        return AlbumGenre::class;
    }

    public function setAuthor($author)
    {
        $this->author = $author;
    }

    public function getAuthor()
    {
        return $this->author;
    }
}
