<?php

if (!function_exists("trans2js")) {
    function trans2js($namespace, $keys = null)
    {
        if (!$keys) {
            return Illuminate\Support\Js::from(__($namespace));
        }
        $result = [];
        foreach ($keys as $key) {
            $result[$key] = __($namespace . "." . $key);
        }
        return Illuminate\Support\Js::from($result);
    }
}

if (!function_exists("hex_2_rgb_tuple")) {
    function hex_2_rgb_tuple($hex)
    {
        if (!$hex || strlen($hex) !== 6) {
            return "";
        }
        $r = base_convert(substr($hex, 0, 2), 16, 10);
        $g = base_convert(substr($hex, 2, 2), 16, 10);
        $b = base_convert(substr($hex, 4, 2), 16, 10);
        return "$r, $g, $b";
    }
}
