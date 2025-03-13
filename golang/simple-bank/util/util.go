package util

const (
	USD = "USD"
	EUR = "EUR"
	NPR = "NPR"
	CAD = "CAD"
)

func IsSupportedCurrency(currency string) bool {
	switch currency {
	case USD, EUR, NPR, CAD:
		return true
	}
	return false
}
