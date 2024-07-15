<?php

namespace App\Exceptions;

use Exception;

class SubdomainInactiveException extends Exception
{
    public function render($request)
    {
        return response()->view('errors.deactive404', [], 403);
    }
}
