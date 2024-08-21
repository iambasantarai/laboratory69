package main

import (
	"fmt"
	"log"
	"os"

    "github.com/joho/godotenv"
)

func main() {
    fmt.Println("Hello world")


    err := godotenv.Load()

    if err != nil {
        log.Fatal("Error loading .env file")
    }

    portString := os.Getenv("PORT")

    if portString == "" {
        log.Fatal("Value for PORT not found in .env file")
    }

    fmt.Println("PORT: ", portString)
}
