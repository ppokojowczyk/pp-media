<?php

namespace App\Dictionary\Genres;

use App\Dictionary\DictionaryArrayAbstract;

abstract class GenresDictionaryAbstract extends DictionaryArrayAbstract
{
    public function getGenres()
    {
        return $this->items;
    }
}
