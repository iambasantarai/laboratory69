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

func TestSumAllTails(t *testing.T) {
	checkSums := func(t testing.TB, want, got []int) {
		t.Helper()

		if !reflect.DeepEqual(want, got) {
			t.Errorf("expected '%v', got '%v'", want, got)
		}
	}

	t.Run("make the sum of tails of", func(t *testing.T) {
		got := SumAllTails([]int{1, 2, 3}, []int{6, 7})
		want := []int{5, 7}

		checkSums(t, want, got)
	})

	t.Run("safely sum empty slices", func(t *testing.T) {
		got := SumAllTails([]int{}, []int{3, 4, 5})
		want := []int{0, 9}

		checkSums(t, want, got)
	})
}
