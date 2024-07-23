package main

import "fmt"

func main()  {
    // %v -> interpolate the default representation
    fmt.Printf("I am %v years old.\n", 22)    
    fmt.Printf("I am %v years old.\n", "twenty two")

    // %s -> interpolate a string
    fmt.Printf("I am %s years old.\n", "twenty two")

    // %d -> interpolate an integer in decimal form
    fmt.Printf("I am %d years old.\n", 22)

    // %f -> interpolate a decimal
    fmt.Printf("I am %f years old.\n", 22.1)
    fmt.Printf("I am %.2f years old.\n", 22.2222)
}
