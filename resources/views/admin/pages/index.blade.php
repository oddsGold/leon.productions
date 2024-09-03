@extends('admin/base')

@section('style')
    @vite('resources/assets/admin/style/index.sass')
@endsection

@section('script')
    @viteReactRefresh
    @vite('resources/assets/admin/js/index.jsx')
@endsection



@section('container')
    <div id="root"></div>
@endsection
