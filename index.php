<?php

    use function Laravel\Prompts\text;
    use function Laravel\Prompts\select;

    require __DIR__ . "/vendor/autoload.php";

    $strings = ['e', 'B', 'G', 'D', 'A', 'E'];

    $string = select(
        "Select a string",
        $strings,
        default: 'e',
        scroll: 6
    );

    if (in_array($string, $strings)) {
        switch ($string) {
            case 'e':
                echo $string . " string is selected. \n";
                break;

            case 'B':
                echo $string . " string is selected. \n";
                break;

            case 'G':
                echo $string . " string is selected. \n";
                break;

            case 'D':
                echo $string . " string is selected. \n";
                break;

            case 'A':
                echo $string . " string is selected. \n";
                break;

            case 'E':
                echo $string . " string is selected. \n";
                break;
            
            default:
                echo "Invalid string.\n";
                break;
        }
    } else {
        echo "Invalid string.\n";
    }

?>
