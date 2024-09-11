<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class AddCspHeaders
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        $response = $next($request);

        //Allow all
        //$response->headers->set('Content-Security-Policy', "default-src * 'unsafe-inline'; script-src * 'unsafe-inline'; connect-src * 'unsafe-inline'; img-src * data: blob: 'unsafe-inline'; frame-src *; style-src * 'unsafe-inline';");

        $response->headers->set('Content-Security-Policy', "script-src 'self' 'unsafe-inline' 'nonce-". \Illuminate\Support\Facades\Vite::cspNonce() . "'");

        //$response->headers->set('Content-Security-Policy', "script-src 'self' 'unsafe-inline' 'unsafe-hashes'; connect-src 'self' https://vimeo.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; media-src 'self' http://player.vimeo.com; frame-src 'self' http://player.vimeo.com; frame-ancestors 'self' http://player.vimeo.com;");
        //$response->headers->set('Content-Security-Policy', "script-src 'self' 'unsafe-inline'; frame-src 'self' https://player.vimeo.com");

        return $response;
    }
}
