
@extends('layout')


@section('head')

    <title>@yield('title', 'Admin panel')</title>

    <!-- Scripts -->
    @yield('script')

    <!-- Fonts -->
    @yield('fonts')

    <!-- Styles -->
    @yield('style')

@endsection

@section('body')

    @yield('container')

@endsection

