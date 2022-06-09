<?php

namespace App\Dictionary\Genres;

use App\Genres\MoviesGenres;

class MoviesGenresDictionary extends GenresDictionaryAbstract
{
    protected $items = [
        MoviesGenres::ACTION => "Action",
        MoviesGenres::ADVENTURE => "Adventure",
        MoviesGenres::ANIMATION => "Animation",
        MoviesGenres::BIOGRAPHY => "Biography",
        MoviesGenres::COMEDY => "Comedy",
        MoviesGenres::CRIME => "Crime",
        MoviesGenres::DOCUMENTARY => "Documentary",
        MoviesGenres::DRAMA => "Drama",
        MoviesGenres::FAMILY => "Family",
        MoviesGenres::FANTASY => "Fantasy",
        MoviesGenres::HISTORY => "History",
        MoviesGenres::HORROR => "Horror",
        MoviesGenres::MYSTERY => "Mystery",
        MoviesGenres::ROMANCE => "Romance",
        MoviesGenres::SCI_FI => "Sci-Fi",
        MoviesGenres::THRILLER => "Thriller",
        MoviesGenres::WAR => "War"
    ];
}
