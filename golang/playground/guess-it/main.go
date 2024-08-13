package main

import (
	"fmt"
	"math/rand/v2"
)

func main() {
    const MAX = 100

    secretNumber := rand.IntN(MAX)
    guess := 0

    for {
        fmt.Printf("Guess a number between 0 & %v: ", MAX)
        fmt.Scan(&guess)

        if guess < secretNumber {
            fmt.Println("Too small.")
        } else if guess > secretNumber {
            fmt.Println("Too big.")
        } else {
            fmt.Println("Correct!")
            break
        }
    }

}
