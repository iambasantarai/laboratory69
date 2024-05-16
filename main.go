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

    fmt.Printf("(os.Args[0]): PROGRAM NAME     %s\n", os.Args[0]) 
    fmt.Printf("(os.Args[1]): FIRST ARGUMENT   %s\n", os.Args[1]) 
    fmt.Printf("(os.Args[2]): SECOND ARGUMENT  %s\n", os.Args[2]) 
}
