<?php

namespace App\Entity;

class ImportDataContainer
{
    public $data = [];
    public $insert = 0;
    public $update = 0;
    public $total = 0;

    public function __construct(
        array $imported,
        int $insert,
        int $update,
        int $total
    ) {
        $this->data = $imported;
        $this->insert = $insert;
        $this->update = $update;
        $this->total = $total;
    }
}
