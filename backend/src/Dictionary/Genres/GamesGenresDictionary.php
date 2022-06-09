<?php

namespace App\Dictionary\Genres;

use App\Genres\GamesGenres;

class GamesGenresDictionary extends GenresDictionaryAbstract
{
    protected $items = [
        GamesGenres::ACTION => "Action",
        GamesGenres::ADVENTURE => "Adventure",
        GamesGenres::FPS => "First Person Shooter",
        GamesGenres::HORROR => "Horror",
        GamesGenres::RACING => "Racing",
        GamesGenres::RPG => "RPG",
        GamesGenres::RTS => "RTS",
        GamesGenres::SCI_FI => "Sci-Fi",
        GamesGenres::STRATEGY => "Strategy",
        GamesGenres::SWORDFIGHTING => "Sword fighting",
        GamesGenres::THRILLER => "Thriller",
        GamesGenres::PLATFORMER => "Platformer"
    ];
}
