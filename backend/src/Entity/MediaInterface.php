<?php

namespace App\Entity;

interface MediaInterface
{
    public function setToBuy(bool $toBuy): void;
    public function getToBuy(): bool;
    public function getIgnoreValidation();
    public function setIgnoreValidation($value);
}
