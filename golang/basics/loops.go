package main

import "fmt"

func main() {

    for i := 0; i < 10; i++ {
        fmt.Println(i)
    }

    // There is no while loop in go
    yourAge := 1
    for yourAge <= 5 {
        fmt.Println("You can not vote now! Current age: ", yourAge)
        yourAge++
    }
    fmt.Println("You can finally vote.")
}
