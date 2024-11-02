package arraysandslices

func Sum(numbers [5]int) int {
	var total int
	for i := 0; i < len(numbers); i++ {
		total += numbers[i]
	}
	return total
}

func main() {
}
