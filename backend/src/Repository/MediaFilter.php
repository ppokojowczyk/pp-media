<?php

namespace App\Repository;

use Symfony\Component\HttpFoundation\Request;

class MediaFilter
{
    private const SORT_FILTER = 'sort';

    private const ORDER_FILTER = 'order';

    private const OWN_FILTER = 'own';

    /**
     * @var array $filters
     */
    private $filters;

    /**
     * Array with filters types.
     * @return string[]
     */
    private static function types(): array
    {
        return [
            static::SORT_FILTER,
            static::ORDER_FILTER,
            static::OWN_FILTER,
        ];
    }

    /**
     * Process filters array, fill up values.
     * @param array $filters
     *
     * @return array
     */
    private function processFiltersArray(array $filters): array
    {
        $processed = [];

        foreach ($this->types() as $filter) {
            $processed[$filter] = isset($filters[$filter])
                ? $filters[$filter]
                : '';
        }

        return $processed;
    }

    /**
     * @param array $filters
     */
    public function __construct(array $filters)
    {
        $this->filters = $this->processFiltersArray($filters);
    }

    /**
     * Return value for `sort` filter.
     * @return string
     */
    public function sort(): string
    {
        return $this->filters[static::SORT_FILTER];
    }

    /**
     * Return value for `order` filter.
     * @return string
     */
    public function order(): string
    {
        return $this->filters[static::ORDER_FILTER];
    }

    /**
     * Return value for `own` filter.
     * @return string
     */
    public function own(): string
    {
        return $this->filters[static::OWN_FILTER];
    }

    /**
     * Create a new MediaFilter instance from Request.
     * @param Request $request
     *
     * @return self
     */
    public static function fromRequest(Request $request): self
    {
        $filters = [];

        foreach (static::types() as $type) {
            $filters[$type] = $request->get($type);
        }

        return new static($filters);
    }
}
