package main

import "fmt"

func sum(x int, y int) int {
    return x + y
}

func product(x, y int) int {
    return x * y
}

func getNames() (string, string) {
    return "James", "Bond"
}

/*
Named return values
*/
func getCoordinates() (x, y int)  {
    // x and y are initialized with zero values

   return // automatically returns x and y
}

func main() {
    x := 10
    y := 10

    total := sum(x,y)
    fmt.Printf("Total of %d and %d is %d.\n", x, y, total)

    product := product(x, y)
    fmt.Printf("Product of %d and %d is %d.\n", x, y, product)

    /*
     A function can return a value that the caller doesn't care about.
     We can explicitly ignore variables by using an underscore (_)
    */
    _, lastName := getNames()
    fmt.Printf("Welcome Mr.%s.\n", lastName)

    a, b := getCoordinates()
    fmt.Printf("a: %d, b: %d\n", a, b)

}
