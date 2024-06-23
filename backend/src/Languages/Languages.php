<?php

namespace App\Languages;

class Languages
{
    /**
     * Array containing all languages.
     * @param array
     */
    protected const LANGUAGES = [
        ['en', 'English'],
        ['pl', 'Polish'],
        ['ru', 'Russian'],
        ['fr', 'French'],
        ['it', 'Italian'],
        ['de', 'German'],
    ];

    /**
     * Returns normalized array of all available languages.
     * @return array
     */
    public function all(): array
    {
        return array_map(function (array $language) {
            return [
                'name' => $language[0],
                'display' => $language[1],
            ];
        }, static::LANGUAGES);
    }
}
