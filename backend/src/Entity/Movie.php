<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Incompass\TimestampableBundle\Entity\TimestampTrait;

/**
 * @ORM\Entity(repositoryClass="App\Repository\MediaRepository")
 */
class Movie extends Media
{
    use TimestampTrait;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\MovieGenre", mappedBy="movie", orphanRemoval=true, cascade="persist")
     */
    protected $genres;

    /**
     * @ORM\Column(type="boolean")
     */
    protected $to_watch;

    public function getGenreClass(): string
    {
        return MovieGenre::class;
    }

    public function setToWatch($value)
    {
        $this->to_watch = $value;
    }

    public function getToWatch()
    {
        return $this->to_watch;
    }
}
