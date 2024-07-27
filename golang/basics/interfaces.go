package main

import "fmt"

/*
Interfaces are collections of method signatures.
Interfaces are implemented implicitly.

A type never declares that it implements a given interface.
If an interface exists and a type has the proper methods defined,
then the type automatically fulfills that interface.

# Clean interfaces
    https://blog.boot.dev/golang/golang-interfaces/
    - keep interfaces small
    - interfaces should have no knowledge of satisfying types
    - interfaces not classes
*/
type shape interface {
    area() float64
    perimeter() float64
}

type rectangle struct {
    length float64
    breadth float64
}


type circle struct {
    radius float64
}

func (r rectangle) area() float64 {
    return r.length * r.breadth
}

func (r rectangle) perimeter() float64 {
    return 2 * (r.length + r.breadth)
}

func (c circle) area() float64 {
    return 3.14 * c.radius * c.radius
}

func (c circle) perimeter() float64 {
    return 2 * 3.14 * c.radius
}

func main() {
    bigRectangle := rectangle {
        length: 20,
        breadth: 10,
    }
    fmt.Printf("AREA of bigRectangle: %f\n", bigRectangle.area())
    fmt.Printf("PERIMETER of bigRectangle: %f\n", bigRectangle.perimeter())

    bigCircle := circle {
        radius: 4,
    }
    fmt.Printf("AREA of bigCircle: %f\n", bigCircle.area())
    fmt.Printf("PERIMETER of bigCircle: %f\n", bigCircle.perimeter())

    // type assertions
    // type switches
}
