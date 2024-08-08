package main

import (
	"fmt"
	"time"
)

func sendEmail(message string) {
    go func() {
        time.Sleep(time.Millisecond * 250)
        fmt.Printf("Email received: '%s'\n", message)
    }()
    fmt.Printf("Email sent: '%s'\n", message)
}

func main() {
    sendEmail("Hi, there.")
	time.Sleep(time.Millisecond * 500)
    sendEmail("I found you.")
	time.Sleep(time.Millisecond * 500)
}
