<?php

    require __DIR__ . "/vendor/autoload.php";

    use function Laravel\Prompts\text;
    use function Laravel\Prompts\select;

    use Colors\Color;

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

    function countdown() {
        for ($i = 3; $i > 0; $i--) { 
            echo "\x20Try another one in ". $i ." seconds...\r";
            sleep(1);
        }
        echo "\033[2K\r";
    }

    function infoLogger($message) {
        $color = new Color();
        echo "\x20" . $color("[INFO]:")->black()->bold()->bg("light_green"). " " . $message ."\n";
    }

    function loop($string, $notes) {

        $score = 0;
        $attempt = 0;
        $totalTime = 0;

        while($attempt < 12) {

            $index = generateRandomIndex($notes);

            $startTime = microtime(true);

            $guess = text(
                label: $index + 1 . " th fret of " . $string . " string is?",
                validate: fn ($value) => match(true) {
                    $value === 'quit' => exit(),
                    !in_array($value, $notes) => 'Please enter a valid musical note.',
                    default => null
                }
            );

            if (!($guess === $notes[$index])) {
                infoLogger("incorrect\n");

                if ($attempt < 11)  countdown();
            } else {
                $endTime = microtime(true);
                $elapsedTime = $endTime - $startTime;
                $totalTime += $elapsedTime;

                $score++;

                infoLogger("correct");
                infoLogger($elapsedTime . "s\n");

                if ($attempt < 11)  countdown();
            }

            $attempt++;
        }

        infoLogger("You scored " . $score . "/" . $attempt);

        if ($score > 0) {
            $averageTime = $totalTime / $attempt;

            infoLogger("Average time per correct guess: " . $averageTime . "s");
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
