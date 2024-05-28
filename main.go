package main

import (
	"fmt"
	"os"
    "github.com/charmbracelet/huh"
)

func main() {
    var (
        noteType string
        thought string
        title string
        url string
        content string
    )

    optionsForm := huh.NewForm(
        huh.NewGroup(
            huh.NewSelect[string]().Title("What type of note would you like to create?").
            Options(
                huh.NewOption("Link", "link"),
                huh.NewOption("Thought", "thought"),
                huh.NewOption("Short Note", "shortNote"),
            ).Value(&noteType),
        ),
    )

    linkForm := huh.NewForm(
        huh.NewGroup(
            huh.NewInput().
                Title("Enter the title for the article link").
                Value(&title),
            huh.NewInput().
                Title("Enter the URL of the article").
                Value(&url),
        ),
    )

    thoughtForm := huh.NewForm(
        huh.NewGroup(
            huh.NewText().
                Title("Share your thought").
                Value(&thought),
        ),
    )

    shortNoteForm := huh.NewForm(
        huh.NewGroup(
            huh.NewInput().
                Title("Enter the title for your short note").
                Value(&title),
            huh.NewText().
                Title("Write the content of your short note").
                Value(&content),
        ),
    )

    err := optionsForm.Run()
    errorHandler(err)

    switch noteType {
    case "link":
        err := linkForm.Run()
        errorHandler(err)
    case "thought":
        err := thoughtForm.Run()
        errorHandler(err)
    case "shortNote":
        err := shortNoteForm.Run()
        errorHandler(err)
    default:
        panic("Invalid Option!")
    }

    linkWriter(title, url)
}

func linkWriter(title string, url string) {
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
