package main

import (
	"errors"
	"fmt"
)

func getUserMap(names []string, phoneNumbers []int) (map[string]user, error) {
    userMap := make(map[string]user)

    if len(names) != len(phoneNumbers) {
        return nil, errors.New("Invalid length.")
    }

    for i := 0; i < len(names); i++ {
        name := names[i]
        phoneNumber := phoneNumbers[i]

        userMap[name] = user{
            name: name,
            phoneNumber: phoneNumber,
        }
    }

    return userMap, nil
}

func deleteUnverifiedUsers(userDetails map[string]userDetail, name string) (deleted bool, err error) {
    existingUser, ok := userDetails[name]

    if !ok {
        return false, errors.New("Not found.")
    }

    if existingUser.isVerified {
        delete(userDetails, name)
        return true, nil
    }

    return false, nil
}

func testDeleteUnverifiedUsers(userDetails map[string]userDetail, name string) {
    fmt.Printf("Attempting to delete %s...\n", name)

    deleted, err := deleteUnverifiedUsers(userDetails, name)

    if err != nil {
        fmt.Println(err)
        return
    }

    if deleted {
        fmt.Printf("Deleted %s\n", name)
        return
    }

    fmt.Println("Did not delete:", name)
}

type user struct {
    name string
    phoneNumber int
}

type userDetail struct {
    name string
    email string
    isVerified bool
}

func main() {
    birthDays := make(map[string]int)

    birthDays["Mitakshya"] = 22
    birthDays["Osin"] = 7
    birthDays["Osin"] = 8

    fmt.Println(birthDays)
    fmt.Println("Birth days map length: ", len(birthDays))

    names := []string{"Basanta", "James"}
    phoneNumbers := []int{9876543210, 9876543211}

    userMaps, err := getUserMap(names, phoneNumbers)

    if err != nil {
        fmt.Println(err)
    }

    fmt.Println("- CREATING USER MAPS -")
    for _, name := range names {
        fmt.Println(name)
    }
    for _, phoneNumber := range phoneNumbers {
        fmt.Println(phoneNumber)
    }

    for _, user := range userMaps {
        fmt.Println(user)
    }

    // insert an element
    // map[key] = value

    // insert an element
    // value = map[key]

    // delete an element
    // delete(map, key)

    // check if a key exists
    // value, ok := map[key]

    userDetails := map[string] userDetail{
        "john": {
            name: "John",
            email: "john@email.com",
            isVerified: true,
        },
        "stafy": {
            name: "Stafy",
            email: "stafy@email.com",
            isVerified: false,
        },
        "mike": {
            name: "Mike",
            email: "mike@email.com",
            isVerified: true,
        },
    }

    testDeleteUnverifiedUsers(userDetails, "john")
    testDeleteUnverifiedUsers(userDetails, "stafy")
    testDeleteUnverifiedUsers(userDetails, "mike")
    testDeleteUnverifiedUsers(userDetails, "prime")

}
