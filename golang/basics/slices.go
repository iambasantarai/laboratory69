package main

import "fmt"

// Variadic function -> it receives the variadic arguments as a slice
func addition(nums ...int) int {
    total := 0;
    for i := 0; i < len(nums); i++ {
        total += nums[i]
    }

    return total
}

func namePrinter(names ...string) {
    for i := 0; i < len(names); i++ {
        fmt.Println(names[i])
    }
}

func createMatrix(rows, cols int) [][] int {
    matrix := make([][]int, 0)

    for i := 0; i < rows; i++ {
        row := make([]int, 0)

        for j := 0; j < cols; j++ {
             // always assign the result of the append() function to the same slice
            row = append(row, i*j)
        }

        matrix = append(matrix, row)
    }

    return matrix
}

func main() {
    // slices references array
    oneToTen := [10]int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}
    twoToEight := oneToTen[1:8]
    fmt.Println(twoToEight)

    // Create new slice -> make([]T, length, capacity) []T
    mySlice := make([]int, 5, 10)
    newSlice := make([]int, 5)
    anotherSlice := []string{"I", "Love", "Go"}

    fmt.Println(mySlice)
    fmt.Println("LENGTH: ", len(newSlice))
    fmt.Println("CAPACITY: ", len(anotherSlice))

    fmt.Println("- VARIADIC FUNCTIONS -")
    total := addition(1, 2, 3)
    fmt.Println("TOTAL: ", total)

    fmt.Println("- SPREAD OPERATOR -")
    names := []string{"joe", "jack", "michel"}
    namePrinter(names...)

    // slice of slices
    my2DMatrix := createMatrix(3, 3)
    for i := 0; i < len(my2DMatrix); i++ {
        fmt.Println(my2DMatrix[i])
    }

    fmt.Println("- RANGE -")
    for i, num := range oneToTen {
        fmt.Println(i, num)
    }
}
