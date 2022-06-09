<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\GameGenresRepository")
 */
class GameGenre
{

    /**
     * @ORM\Id
     * @ORM\ManyToOne(targetEntity="Game", inversedBy="genres")
     */
    private $game;

    /**
     * @ORM\Id
     * @ORM\Column(type="string", length=50)
     */
    private $genre;

    public function __construct($game, $genre)
    {
        $this->game = $game;
        $this->genre = $genre;
    }

    public function getName()
    {
        return $this->genre;
    }
}
