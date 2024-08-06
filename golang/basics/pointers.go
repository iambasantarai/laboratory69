package main

import "fmt"

/*
x := 5
y := x
z := &x
*z = 4 -> updates the value of x to 4

name | address | value
x    | 69      | 5
y    | 70      | 5
z    | 71      | 69
*/

type car struct {
    color string
}

func (c *car) setColor(color string) {
    c.color = color
}

func main() {
    /*
    if a pointer points to nothing(the zero value of the pointer type)
    then dereferencing it will cause a runtime error(panic)
    */
    // var p *int

    myName := "basanta"
    myNamePointer := &myName

    fmt.Println(*myNamePointer)

    *myNamePointer = "BASANTA"
    fmt.Println(*myNamePointer)

    newCar := car {
        color: "White",
    }
    fmt.Println("Default color of car: ", newCar.color)

    newCar.setColor("Golden")
    fmt.Println("Color changed to: ", newCar.color)
}
