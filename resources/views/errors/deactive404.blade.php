
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <title>{{ __('Unauthorized') }}</title>
        @vite('resources/sass/style-subsite.scss')

    </head>
    <body>
        <div class="wrapper">
            <section>
                <article class="article_main collection_introduction deactive-page">
                    <p>
                        <img src="{{url('public/images/eiie_icon_2.svg')}}" width="75px" />
                    </p>
                    <h3>
                        {{ __('eiie.This website is currently disabled by the administrator.') }} {{ __('eiie.Please contact the administrator for further assistance.') }}
                    </h3>
                    <p>
                        <a href="mailto:admin@example.com">{{ __('eiie.Contact Administrator') }}</a>
                    </p>
                    <p>
                        <ol class="files">
                            <li>
                                <a href="https://www.ei-ie.org/">
                                {{ __('eiie.Go to Education International') }}
                                </a>
                            </li>
                        </ol>
                    </p>
                </article>
            </section>

        </div>
    </body>
    </html>