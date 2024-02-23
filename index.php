<?php

    use function Laravel\Prompts\text;
    use function Laravel\Prompts\select;

    require __DIR__ . "/vendor/autoload.php";

    $strings = ['e', 'B', 'G', 'D', 'A', 'E'];

    $eStringNotes = ['F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E'];
    $BStringNotes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    $GStringNotes = ['G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G'];
    $DStringNotes = ['D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D'];
    $AStringNotes = ['A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A'];
    $EStringNotes = ['F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E'];

    $string = select(
        "Select a string",
        $strings,
        default: 'e',
        scroll: 6
    );

    function generateRandomIndex($values) {
        return rand(0, count($values) - 1);
    }

    function loop($string, $notes) {
        while(true) {
            $index = generateRandomIndex($notes);
            $guess = text(
                label: $index + 1 . " th fret of " . $string . " string is?",
                validate: fn ($value) => match(true) {
                    $value === 'quit' => exit(),
                    !in_array($value, $notes) => 'Please enter a valid musical note.',
                    default => null
                }
            );

            if (!($guess === $notes[$index])) {
                echo "INCORRECT\n\n";
            } else {
                echo "CORRECT\n\n";
            }
        }
    }

    if (in_array($string, $strings)) {
        switch ($string) {
            case 'e':
                loop("e", $eStringNotes);
                break;

            case 'B':
                loop("B", $BStringNotes);
                break;

            case 'G':
                loop("G", $GStringNotes);
                break;

            case 'D':
                loop("D", $DStringNotes);
                break;

            case 'A':
                loop("A", $AStringNotes);
                break;

            case 'E':
                loop("E", $EStringNotes);
                break;
            
            default:
                echo "Invalid string.\n";
                break;
        }
    } else {
        echo "Invalid string.\n";
    }

?>
