<?php

namespace App\Dictionary;

abstract class DictionaryArrayAbstract implements DictionaryArrayInterface
{

    protected $items = [];

    public function getArray()
    {
        return $this->items;
    }
}
