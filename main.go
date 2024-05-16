package main

import (
	"fmt"
	"log"
	"os"
)

func main() {

    if len(os.Args) != 3 {
       log.Fatalf("Error! Got more than expected arguments.\n") 
    }

    noteWriter(os.Args[1], os.Args[2])
}

func noteWriter(title string, url string) {
    filename := "/home/basanta/Code/termnote/termnote.md"
    file, err := os.OpenFile(filename, os.O_CREATE|os.O_APPEND|os.O_WRONLY, 0666) 

    if err != nil {
        fmt.Println("Error! Operation failed.")
        panic(err)
    }

    _, err = file.WriteString("[" + title + "]" + "(" + url +")" + "\n")

    if err != nil {
        fmt.Println("Error! Operation failed.")
        panic(err)
    }

    defer file.Close()
}
