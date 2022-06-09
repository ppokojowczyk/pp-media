<?php

namespace App\EventListener;

use Doctrine\DBAL\Event\ConnectionEventArgs;

class PdoInit
{
    public function postConnect(ConnectionEventArgs $args)
    {
        $args->getConnection()->exec("SET time_zone = 'Europe/Warsaw';");
    }
}
