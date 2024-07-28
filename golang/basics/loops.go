package main

import "fmt"

// using continue and break
func printPrime(max int) {
    for n := 2; n <= max + 1; n++ {
        if n == 2 {
            fmt.Println(n)
            continue
        }

        if n % 2 == 0 {
            continue
        }

        isPrime := true
        for i := 3; i * i < n + 1; i++ {
            if n % i == 0 {
                isPrime = false
                break
            }
        }

        if !isPrime {
            continue
        }
        fmt.Println(n)
    }
}

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

    printPrime(10)
}
