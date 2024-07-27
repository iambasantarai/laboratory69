package main

import (
	"errors"
	"fmt"
)

func sendSMSToCouple(smsToCustomer, smsToSpouse string) (float64, error) {
    costOfCustomerSMS, err := sendSMS(smsToCustomer)
    if err != nil {
        return 0.0, err
    }

    costOfSpouseSMS, err := sendSMS(smsToCustomer)
    if err != nil {
        return 0.0, err
    }

    return costOfCustomerSMS + costOfSpouseSMS, nil
}

func sendSMS(message string) (float64, error) {
    const maxTextLength = 25
    const costPerCharacter = .0002

    if len(message) > maxTextLength {
        return 0.0, fmt.Errorf("Can't send texts over %v characters.", maxTextLength)    
    }

    return costPerCharacter * float64(len(message)), nil
}

// Error interface
type divideError struct {
    dividend float64
}

func (de divideError) Error() string {
    return fmt.Sprintf(
        "Can not divide %v by ZERO.",
        de.dividend,
    )
}

func divide(dividend, divisor float64) (float64, error) {
    if divisor == 0 {
        return 0.0, errors.New("Can not divide by zero.")
    }

    return dividend / divisor, nil
}

func main() {
    // smsToCustomer := "Thanks for shopping with us."
    smsToCustomer := "Thanks for visiting us."
    smsToSpouse := "Visit us again."
    totalCost, err := sendSMSToCouple(smsToCustomer, smsToSpouse)

    if err != nil {
        fmt.Println("ERROR: ", err) 
        return
    }

    fmt.Printf("Message for customer: %s\n", smsToCustomer)
    fmt.Printf("Message for spouse: %s\n", smsToSpouse)
    fmt.Printf("Total cost: $%.3f\n", totalCost)

    result, err := divide(10, 0)
    if err != nil {
        fmt.Println("ERROR: ", err)
        return
    }
    fmt.Printf("Result: %d", result)
}
