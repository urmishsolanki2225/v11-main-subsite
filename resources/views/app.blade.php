<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />    
    @viteReactRefresh
    @vite(['resources/js/app.tsx'])
    <style type="text/css">
      body {
        margin: 0;
        padding: 0;
      }
    </style>
    <title>Ei-iE.org Admin</title>
  </head>
  <body>
    @routes
    @inertia
  </body>
</html>