<?php

namespace App\Repository;

use Symfony\Component\HttpFoundation\Request;

class MediaFilter
{
    /**
     * @var array
     */
    private $filters;

    private function processFiltersArray(array $filters)
    {
        $processed = [
            'sort' => '',
            'order' => '',
            'own' => '',
        ];

        foreach (['sort', 'order', 'own'] as $k) {
            if (isset($filters[$k])) {
                $processed[$k] = $filters[$k];
            }
        }

        return $processed;
    }

    public function __construct(array $filters)
    {
        $this->filters = $this->processFiltersArray($filters);
    }

    public function sort(): string
    {
        return $this->filters['sort'];
    }

    public function order(): string
    {
        return $this->filters['order'];
    }

    public function own(): string
    {
        return $this->filters['own'];
    }

    public static function fromRequest(Request $request): self
    {
        return new static([
            'sort' => $request->get('sort'),
            'order' => $request->get('order'),
            'own' => $request->get('own'),
        ]);
    }
}
