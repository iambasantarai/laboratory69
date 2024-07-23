package main

import "fmt"

func main() {
    day := "monday"

    if day == "saturday" {
        fmt.Println("YAY! Holdiay.")
    } else if day == "sunday" {
        fmt.Println("YAY! Holiday.")
    } else {
        fmt.Println("Aghh! Here we go again.")
    }

    if age := 18; age >= 18 {
        fmt.Println("You can vote.")
    }
}
