<?php

namespace App;

use App\Dictionary\Genres\AlbumsGenresDictionary;
use App\Dictionary\Genres\BooksGenresDictionary;
use App\Dictionary\Genres\GamesGenresDictionary;
use App\Dictionary\Genres\GenresDictionaryAbstract;
use App\Dictionary\Genres\MoviesGenresDictionary;
use App\Entity\Album;
use App\Entity\Book;
use App\Entity\Game;
use App\Entity\MediaType;
use App\Entity\Movie;
use App\Repository\MediaRepository;
use Doctrine\ORM\EntityManagerInterface;
use InvalidArgumentException;

class Factory
{
    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    protected function invalidMediaTypeException(): InvalidArgumentException
    {
        return new InvalidArgumentException("Invalid Media type.");
    }

    public function makeGenresDictionary(string $mediaType = ''): GenresDictionaryAbstract
    {
        if ($mediaType === MediaType::movie())
            return new MoviesGenresDictionary();
        else if ($mediaType === MediaType::book())
            return new BooksGenresDictionary();
        else if ($mediaType === MediaType::game())
            return new GamesGenresDictionary();
        else if ($mediaType === MediaType::music())
            return new AlbumsGenresDictionary();
        throw $this->invalidMediaTypeException();
    }

    public function makeMediaClass(string $mediaType = ''): string
    {
        if ($mediaType === MediaType::book())
            return Book::class;
        elseif ($mediaType === MediaType::movie())
            return Movie::class;
        elseif ($mediaType === MediaType::game())
            return Game::class;
        elseif ($mediaType === MediaType::music())
            return Album::class;
        throw $this->invalidMediaTypeException();
    }

    public function makeMediaRepository(string $mediaType = ''): MediaRepository
    {
        $em = $this->em;
        $Repository = new MediaRepository($em, $em->getClassMetadata($this->makeMediaClass($mediaType)));
        return $Repository;
    }
}
