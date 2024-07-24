package main

import (
	"errors"
	"fmt"
)

func divide(dividend, divisor int) (int, error) {
    if divisor == 0 {
        return 0, errors.New("Can't divide by zero.")
    }
    
    return dividend/divisor, nil
}

func main() {
    /*
    Early returns or guard clauses
    - early return from a function when given condition is met
    */

    result, err := divide(10, 5)

    if err != nil {
        panic(err)
    }

    fmt.Printf("Result: %d\n", result)

}
