<?php

namespace App\Controller;

use App\Dictionary\Genres\GenresDictionaryAbstract;
use App\Factory;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;

class GenresController extends AbstractController
{
    /**
     * @var Factory
     */
    protected $Factory;

    public function __construct(Factory $Factory)
    {
        $this->Factory = $Factory;
    }

    public function genres(string $mediaType = ''): JsonResponse
    {
        return new JsonResponse(
            $this->getGenresDictionaryArray($this->Factory->makeGenresDictionary($mediaType))
        );
    }

    public function getGenresDictionaryArray(GenresDictionaryAbstract $Dictionary): array
    {
        return array_map(function ($name, $display) {
            return ['name' => $name, 'display' => $display];
        }, array_keys($data = $Dictionary->getArray()), $data);
    }
}
