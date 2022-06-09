<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\GameGenresRepository")
 */
class BookGenre
{

    /**
     * @ORM\Id
     * @ORM\ManyToOne(targetEntity="Book", inversedBy="genres")
     */
    private $book;

    /**
     * @ORM\Id
     * @ORM\Column(type="string", length=50)
     */
    private $genre;

    public function __construct($book, $genre)
    {
        $this->book = $book;
        $this->genre = $genre;
    }

    public function getName()
    {
        return $this->genre;
    }
}
