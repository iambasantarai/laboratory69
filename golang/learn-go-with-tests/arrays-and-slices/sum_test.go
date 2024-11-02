package arraysandslices

import "testing"

func TestSum(t *testing.T) {
	numbers := [5]int{1, 2, 3, 4, 5}
	got := Sum(numbers)
	want := 15

	if got != want {
		t.Errorf("expected '%d', result '%d', given '%v'", want, got, numbers)
	}
}
