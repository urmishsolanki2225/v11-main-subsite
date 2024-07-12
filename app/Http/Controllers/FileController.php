<?php

namespace App\Http\Controllers;

use App\Models\ResourceFile;
use Illuminate\Support\Facades\Storage;

class FileController extends Controller
{
    public function download(ResourceFile $file) {
        $path = $file->path;
        if (Storage::exists('files/'.$path)) {
            return Storage::download('files/'.$path, $file->original_filename);
        } else {
            abort(404);
        }
    }
}
