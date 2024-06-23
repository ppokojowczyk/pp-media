<?php

namespace App\Languages;

class Languages
{
    /**
     * Returns array of all available languages.
     * @return array
     */
    public function all(): array
    {
        $languages = array_map(function (string $language) {
            return [
                'name' => strtolower(substr($language, 0, 2)),
                'display' => $language,
            ];
        }, [
            'English',
            'Polish',
            'Russian',
            'German',
        ]);

        return $languages;
    }
}
