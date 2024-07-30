package main

import "fmt"

func main() {

    fmt.Println("- BIRTH DAYS -")
    var birthDays [3]int 
    birthDays[0] = 22
    birthDays[1] = 19
    birthDays[2] = 8

    for i := 0; i < len(birthDays); i++ {
        fmt.Println(birthDays[i])
    }

    fmt.Println("- PHONE NUMBERS -")
    phoneNumbers := [2]int{9876543210, 9876543211}
    for i := 0; i < len(phoneNumbers); i++ {
        fmt.Println(phoneNumbers[i])
    }

    fmt.Println("- 2D ARRAY -")
    twoD := [2][3]int{
        {2, 4, 6},
        {8, 10, 12},
    }
    for i := 0; i < 2; i++ {
        for j := 0; j < 3; j++ {
            fmt.Println(twoD[i][j])
        }
    }
}
