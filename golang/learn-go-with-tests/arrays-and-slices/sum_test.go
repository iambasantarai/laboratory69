package arraysandslices

import (
	"reflect"
	"testing"
)

func TestSum(t *testing.T) {
	t.Run("collection of any size", func(t *testing.T) {
		numbers := []int{1, 2, 3}
		got := Sum(numbers)
		want := 6

		if got != want {
			t.Errorf("expected '%d', result '%d', given '%v'", want, got, numbers)
		}
	})
}

func TestSumAll(t *testing.T) {
	got := SumAll([]int{1, 2, 3}, []int{2, 3})
	want := []int{6, 5}

	if !reflect.DeepEqual(got, want) {
		t.Errorf("expected '%v', got '%v'", want, got)
	}
}
