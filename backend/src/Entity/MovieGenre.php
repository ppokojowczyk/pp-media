<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\MovieGenresRepository")
 */
class MovieGenre
{

    /**
     * @ORM\Id
     * @ORM\ManyToOne(targetEntity="Movie", inversedBy="genres")
     */
    private $movie;

    /**
     * @ORM\Id
     * @ORM\Column(type="string", length=50)
     */
    private $genre;

    public function __construct($movie, $genre)
    {
        $this->movie = $movie;
        $this->genre = $genre;
    }

    public function getName()
    {
        return $this->genre;
    }
}
