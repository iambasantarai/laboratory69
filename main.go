package main

import (
	"fmt"
	"os"
    "github.com/charmbracelet/huh"
)

func main() {
    var (
        title string
        url string
    )

    form := huh.NewForm(
        huh.NewGroup(
            huh.NewInput().
                Title("Title").
                Value(&title),
            huh.NewInput().
                Title("URL").
                Value(&url),
        ),
    )

    err := form.Run()
    errorHandler(err)

    noteWriter(title, url)
}

func noteWriter(title string, url string) {
    filename := "/home/basanta/Code/termnote/termnote.md"
    file, err := os.OpenFile(filename, os.O_CREATE|os.O_APPEND|os.O_WRONLY, 0666) 
    errorHandler(err)

    _, err = file.WriteString("[" + title + "]" + "(" + url +")" + "\n")
    errorHandler(err)

    defer file.Close()
}

func errorHandler(err error)  {
    if err != nil {
        fmt.Println("Error! Operation failed.")
        panic(err)
    }
}
