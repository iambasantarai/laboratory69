package main

import "fmt"

func main()  {
    var name string
    name = "Basanta"
    age := 22 // := infers the type of the new variable based on the value

    fmt.Printf("Name : %v\n", name)
    fmt.Printf("Age  : %v\n", age)
}
