#!/bin/sh

date
php artisan migrate:rollback
php artisan migrate

cat > config-eiie.php <<EOF
<?php

use Illuminate\Support\Str;

return [
    'pagination_size' => 18,
    'pagination_size_xl' => 36,

    'collection' => [
EOF

php artisan db:seed

cat >> config-eiie.php <<EOF2
    ],
    'old_item' => [
        'origins-and-history' => 15179,
        'principal-aims' => 4360,
        'global-unions' => 4355
    ],
    'item' => [
        'who-we-are' => 24177
    ]
];
EOF2

date
mv config-eiie.php config/eiie.php 
php artisan db:dump  
