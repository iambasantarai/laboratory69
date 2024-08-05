package main

import "fmt"

func add(x, y int) int {
    return x + y
}

func multiply(x, y int) int {
    return x * y
}

func aggregate(a, b, c int, operation func(int, int) int) int {
    return operation(operation(a, b), c)
}

/*
CURRYING:
 is a practice of writing a function that takes a function (or functions) as input,
 and returns a new function
*/
func selfMath(mathFunc func(int, int) int) func(int) int {
    return func( x int) int {
        return mathFunc(x, x)
    }
}

/* DEFER:
 it allows function to be executed automatically just before its enclosing function returns
*/
func printHelloWorld() {
    defer fmt.Println("World")
    fmt.Println("Hello")
}

/* CLOSURE:
 a function that references variables from outside its own function body.
 the function may access and assign to the referenced variables
*/
func adder() func(int) int {
    sum := 0
    return func (x int) int {
        sum += x 
        return sum
    }
}

type emailBill struct {
    constInPennies int
}

/* ANONYMOUS FUNCTIONS:
 are true to form in that they have no name
 useful when defining a function that will only be used once or to create a quick closure
*/
func printReports(messages []string) {
    for _, message := range messages {
        printCostReport(func (content string) int {
            return len(content) * 2
        }, message)
    }
}

func printCostReport(costCalculator func(string) int, message string) {
    cost := costCalculator(message)
    fmt.Printf(`Message: %s Cost: %v cents`, message, cost)
    fmt.Println()
}

func main(){
    // using first-class/higher-order functions
    fmt.Println(aggregate(3, 4, 5, add))
    fmt.Println(aggregate(3, 4, 5, multiply))

    // using currying functions
    squareFunc := selfMath(multiply)
    fmt.Println(squareFunc(5))

    printHelloWorld()

    // using closures
    bills := []emailBill{
        {45},
        {50},
        {55},
    }
    countAdder, costAdder := adder(), adder()
    for _, bill := range bills {
        fmt.Printf("You've sent %d emails and it has cost you %d cents\n", countAdder(1), costAdder(bill.constInPennies))
    }

    // using anonymous functions
    messages := []string{
        "Oh, hey there.",
        "Hey, sexy lady.",
        "Hi.",
    }
    printReports(messages)
}
