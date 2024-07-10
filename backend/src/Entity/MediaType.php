<?php

namespace App\Entity;

class MediaType
{
    public static function movie(): string
    {
        return "movie";
    }

    public static function book(): string
    {
        return "book";
    }

    public static function game(): string
    {
        return "game";
    }

    public static function album(): string
    {
        return "album";
    }
}
