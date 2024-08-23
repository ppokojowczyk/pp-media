<?php

namespace App\Entity;

use Exception;

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

    public static function typeByMediaClass(string $mediaClass): string
    {
        switch ($mediaClass) {
            case Album::class:
                return static::album();
            case Book::class:
                return static::book();
            case Movie::class:
                return static::movie();
            case Game::class:
                return static::game();
            default:
                throw new Exception('Media type not found.');
        }
    }
}
