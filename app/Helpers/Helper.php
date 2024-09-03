<?php


use Illuminate\Support\Str;

if (!function_exists('base64UrlEncode')) {
    function base64UrlEncode($data)
    {
        //return strtr(base64_encode($data), '+/=', '-_,');
        return str_replace(
            ['+', '/', '='],
            ['-', '_', ''],
            base64_encode($data)
        );
    }
}


if (!function_exists('base64UrlDecode')) {
    function base64UrlDecode($data)
    {
        return base64_decode(str_replace(
            ['-', '_'],
            ['+', '/'],
            $data
        ));
        //return base64_decode(strtr($data, '-_,', '+/='));
    }
}

if (!function_exists('date_custom_format')) {
    function date_custom_format($date, $format = null)
    {
        return is_null($date) ? $date : Carbon\Carbon::parse($date)
            ->format($format ? $format : 'd.m.Y H:i:s');
    }
}

if (!function_exists('str_limit_text')) {
    function str_limit_text($length = 140, $text = '', $alternativeText = '')
    {
        if($text == '' || is_null($text)){
            $text = $alternativeText;
        }

        $text = strip_tags($text);
        $text = trim($text);

        return \Illuminate\Support\Str::limit($text, $length, $end = '...');
    }
}

if (!function_exists('parse_host')){
    function parse_host($url)
    {
        $info = parse_url($url);
        if($info && is_array($info) && isset($info['host'])){
            $url = $info['host'];
        }
        return $url;
    }
}

