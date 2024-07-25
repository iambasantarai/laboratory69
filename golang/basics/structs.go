package main

import "fmt"

type animal struct {
    kind string
    livesIn string
}

type pet struct {
    name string
    age int
    animal
}

// Struct methods
func (p pet) activity() string {
    return fmt.Sprintf("%s Oinks.", p.name)
}

func main() {
    dog := animal {
        kind: "Domestic",
        livesIn: "Home",
    }
    fmt.Println("- Struct -")
    fmt.Printf("Dog is a %s animal and lives in %s.\n", dog.kind, dog.livesIn)

    /*
    Anonymous struct
    Only use it when it is only being used once
    */
    myPet := struct {
        name string
        age int
    } {
        name: "Bhunte",
        age: 2,
    }
    fmt.Println("- Anonymous struct -")
    fmt.Printf("NAME: %s\n", myPet.name)
    fmt.Printf("AGE: %d\n", myPet.age)

    /*
    Embedded structs
    */
    hoggy := pet {
        name: "Hoggy",
        age: 4,
        animal: animal {
            kind: "Domestic",
            livesIn: "Farm",
        },
    }

    // Embedded fields are promoted to top-level
    fmt.Println("- Embedded struct -")
    fmt.Printf("NAME: %s\n", hoggy.name)
    fmt.Printf("AGE: %d\n", hoggy.age)
    fmt.Printf("KIND: %s\n", hoggy.kind)
    fmt.Printf("LIVES_IN: %s\n", hoggy.livesIn)
    fmt.Println(hoggy.activity())
}
