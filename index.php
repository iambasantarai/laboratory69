<?php

    use function Laravel\Prompts\text;

    require __DIR__ . "/vendor/autoload.php";
     
    $name = text("What is your name?");

    echo "Hello, " . $name . ".\n";
?>
