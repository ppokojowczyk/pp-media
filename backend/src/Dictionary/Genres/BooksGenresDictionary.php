<?php

namespace App\Dictionary\Genres;

use App\Genres\BooksGenres;

class BooksGenresDictionary extends GenresDictionaryAbstract
{
    protected $items = [
        BooksGenres::ACTION => "Action",
        BooksGenres::ADVENTURE => "Adventure",
        BooksGenres::ANIMATION => "Animation",
        BooksGenres::BIOGRAPHY => "Biography",
        BooksGenres::COMEDY => "Comedy",
        BooksGenres::CRIME => "Crime",
        BooksGenres::DOCUMENTARY => "Documentary",
        BooksGenres::DRAMA => "Drama",
        BooksGenres::FAMILY => "Family",
        BooksGenres::FANTASY => "Fantasy",
        BooksGenres::HISTORY => "History",
        BooksGenres::HORROR => "Horror",
        BooksGenres::MYSTERY => "Mystery",
        BooksGenres::ROMANCE => "Romance",
        BooksGenres::SCI_FI => "Sci-Fi",
        BooksGenres::THRILLER => "Thriller",
        BooksGenres::WAR => "War",
        BooksGenres::COMPUTER_SCIENCE => "Computer Science",
    ];
}
