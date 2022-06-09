<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\GameGenresRepository")
 */
class AlbumGenre
{

    /**
     * @ORM\Id
     * @ORM\ManyToOne(targetEntity="Album", inversedBy="genres")
     */
    private $album;

    /**
     * @ORM\Id
     * @ORM\Column(type="string", length=50)
     */
    private $genre;

    public function __construct($album, $genre)
    {
        $this->album = $album;
        $this->genre = $genre;
    }

    public function getName()
    {
        return $this->genre;
    }
}
