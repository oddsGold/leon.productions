@extends('site/base')

@section('title', '404 Сторінку не знайдено')

@section('content')

    <main class="error-page">

        <section class="error">
            <div class="container">
                <div class="error-content">
                    <p>O<span>o</span>ps</p>
                    <h1>404 - page not found</h1>
                    <p class="error-info">The page you are looking for might have been removed had its name changed or is  temporarily unavailable.</p>
                    <a href="/">go to homepage</a>
                </div>
            </div>
        </section>
    </main>

@endsection
