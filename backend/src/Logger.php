<?php

namespace App;

class Logger
{
    public static function log($message = ''): void
    {
        error_log(json_encode($message));
    }
}
