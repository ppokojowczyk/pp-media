<?php

namespace App\Service;

use App\Entity\MediaType;
use App\Factory;
use App\Repository\MediaRepository;

class Statistics
{
    /**
     * @var Factory
     */
    protected $factory;

    /**
     * @param Factory $factory
     */
    public function __construct(Factory $factory)
    {
        $this->factory = $factory;
    }

    public function allStatistics(): array
    {
        $data = [];
        $mediaTypes = [
            [MediaType::game(), 'Games'],
            [MediaType::movie(), 'Movies'],
            [MediaType::album(), 'Albums'],
            [MediaType::book(), 'Books'],
        ];
        $total = 0;

        foreach ($mediaTypes as $mT) {
            $repository = $this->factory->makeMediaRepository($mT[0]);
            $data[] = [
                "name" => sprintf("Owned %s Count", $mT[1]),
                "value" => $repository->countOwned(),
            ];
            $data[] = [
                "name" => sprintf("Owned %s Total Cost", $mT[1]),
                "value" => $ownedTotalCost = $repository->ownedTotalCost(),
            ];
            if ($ownedTotalCost) {
                $total += $ownedTotalCost;
            }
        }

        $data[] = [
            "name" => "Owned Total Cost",
            "value" => $total,
        ];

        return $data;
    }
}
