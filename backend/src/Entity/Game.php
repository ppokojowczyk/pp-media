<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Incompass\TimestampableBundle\Entity\TimestampTrait;

/**
 * @ORM\Entity(repositoryClass="App\Repository\MediaRepository")
 */
class Game extends Media
{
    use TimestampTrait;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\GameGenre", mappedBy="game", orphanRemoval=true, cascade="persist")
     */
    protected $genres;

    /**
     * @ORM\Column(type="boolean")
     */
    protected $to_play;

    /**
     * @ORM\Column(type="string", length=255)
     */
    protected $developer;

    public function getGenreClass(): string
    {
        return GameGenre::class;
    }

    public function setToPlay($value)
    {
        $this->to_play = $value;
    }

    public function getToPlay()
    {
        return $this->to_play;
    }

    public function setDeveloper($developer)
    {
        $this->developer = $developer;
    }

    public function getDeveloper()
    {
        return $this->developer;
    }
}
