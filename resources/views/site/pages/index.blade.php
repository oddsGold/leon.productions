@extends('site/base')

@section('title', 'LEON POST PRODUCTION')
@section('description', 'LEON POST PRODUCTION')


@section('style')

@endsection

@section('content')

{{--    <div id="root"></div>--}}

@endsection


@section('script-body')
    <script nonce="{{ \Illuminate\Support\Facades\Vite::cspNonce() }}">
        window.appData = {
            about: {!! \Illuminate\Support\Js::from($about) !!},
            cases: {!! \Illuminate\Support\Js::from($cases) !!},
            contact: {!! \Illuminate\Support\Js::from($contact) !!},
            footer: {!! \Illuminate\Support\Js::from($footer) !!},
        };
    </script>
@endsection
