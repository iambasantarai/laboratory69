package main

import (
	"fmt"
	"time"
)

func filterOldEmails(emails []email) {
    isOldChan := make(chan bool)

    go func(){
		for _, e := range emails {
			if e.date.Before(time.Date(2020, 0, 0, 0, 0, 0, 0, time.UTC)) {
				isOldChan <- true
				continue
			}
			isOldChan <- false
		}
    }()

	isOld := <-isOldChan
	fmt.Println("email 1 is old:", isOld)
	isOld = <-isOldChan
	fmt.Println("email 2 is old:", isOld)
	isOld = <-isOldChan
	fmt.Println("email 3 is old:", isOld)
}

func waitForDbs(numDBs int, dbChan chan struct{}) {
	for i := 0; i < 5; i++ {
		<-dbChan
	}
}

func getDatabasesChannel(numDBs int) chan struct{} {
    /*
    Empty structs are often used as tokens, in this context, a token is unary value
    */
	ch := make(chan struct{})
	go func() {
		for i := 0; i < 5; i++ {
			ch <- struct{}{}
			fmt.Printf("Database %v is online\n", i+1)
		}
	}()
	return ch
}

type email struct {
	body string
	date time.Time
}

func main() {
    /*
    channels are typed, thread-safe queue
    allows different goroutines to communicate with each other
    <- is channel operator
    */

    /* IT CAUSES DEADLOCK
    ch := make(chan int)
    ch <-69
    v := <-ch
    fmt.Println(ch)
    fmt.Println(v)
    */

    emails := []email {
        {
			body: "Are you going to make it?",
			date: time.Date(2019, 0, 0, 0, 0, 0, 0, time.UTC),
		},
		{
			body: "I need a break",
			date: time.Date(2021, 0, 0, 0, 0, 0, 0, time.UTC),
		},
		{
			body: "What were you thinking?",
			date: time.Date(2022, 0, 0, 0, 0, 0, 0, time.UTC),
		},
     }

     filterOldEmails(emails)

	dbChan := getDatabasesChannel(5)
	fmt.Printf("Waiting for %v databases...\n", 5)
	waitForDbs(5, dbChan)
	time.Sleep(time.Millisecond * 10)
	fmt.Println("All databases are online!")
}
