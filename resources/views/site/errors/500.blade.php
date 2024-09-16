@extends('site/base')

@section('title', '500 Internal Server Error')

@section('content')

    <main class="error-page">
        <section class="error">
            <div class="container">
                <div class="error-content">
                    <p>O<span>o</span>ps</p>
                    <h1>500 - Internal Server Error</h1>
                    <p class="error-info">Please try again later.</p>
                    <a href="/">go to homepage</a>
                </div>
            </div>
        </section>
    </main>

@endsection
