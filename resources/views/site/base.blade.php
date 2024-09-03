@extends('layout')

@section('head')

    <title>@yield('title', config('app.name', 'Site'))</title>
    <meta name="description" content="@yield('description', '')">
    <meta name="keywords" content="@yield('keywords', '')">

    <!-- Scripts -->
    @yield('script-head')

    <!-- Styles -->
    @yield('style')
    @vite('resources/assets/site/style/index.sass')

    <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
{{--    <link rel="apple-touch-icon" sizes="180x180" href="{{ Vite::image('favicons/apple-touch-icon.png') }}">--}}
{{--    <link rel="apple-touch-icon" sizes="144x144" href="{{ Vite::image('favicons/apple-icon-144x144.png') }}">--}}
{{--    <link rel="apple-touch-icon" sizes="114x114" href="{{ Vite::image('favicons/apple-icon-114x114.png') }}">--}}
{{--    <link rel="apple-touch-icon" sizes="76x76" href="{{ Vite::image('favicons/apple-icon-76x76.png') }}">--}}
{{--    <link rel="icon" type="image/png" sizes="32x32" href="{{ Vite::image('favicons/favicon-32x32.png') }}">--}}
{{--    <link rel="icon" type="image/png" sizes="16x16" href="{{ Vite::image('favicons/favicon-16x16.png') }}">--}}
{{--    <link rel="mask-icon" href="{{ Vite::image('favicons/safari-pinned-tab.svg') }}" color="#f2ab3c">--}}
    <meta name="msapplication-TileColor" content="#f2ab3c">
    <meta name="theme-color" content="#ffffff">
    <link rel="manifest" href="/manifest.webmanifest">
    <meta property="og:url" content="{{ url()->full() }}" />
    <meta property="og:image:height" content="492">
    <meta property="og:image:width" content="940">
{{--    <meta property="og:image" content="{{ Vite::image('favicons/og-image.jpg') }}">--}}
    <meta property="og:title" content="">
    <meta property="og:description" content="">

    @include('site.components.analytics.analytics-head')

@endsection

@section('body')

    @include('site.components.analytics.analytics-body')

    <div class="wrapper">

        @yield('content')

    </div>

    @viteReactRefresh
    @vite('resources/assets/site/js/index.jsx')

    @yield('script-body')
    @include('site.components.analytics.analytics-body')
@endsection

