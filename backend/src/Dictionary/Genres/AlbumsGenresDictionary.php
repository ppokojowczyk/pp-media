<?php

namespace App\Dictionary\Genres;

use App\Genres\AlbumsGenres;

class AlbumsGenresDictionary extends GenresDictionaryAbstract
{
    protected $items = [
        AlbumsGenres::HEAVY_METAL => "Heavy Metal",
    ];
}
