package maps

import "testing"

func TestDictionary(t *testing.T) {
	dictionary := Dictionary{"test": "this is a test"}

	t.Run("known word", func(t *testing.T) {
		got, _ := dictionary.Search("test")
		want := "this is a test"

		assertStrings(t, want, got)
	})

	t.Run("unknown word", func(t *testing.T) {
		_, got := dictionary.Search("unknown")

		if got == nil {
			t.Fatal("Expected to got an error")
		}

		assertError(t, ErrNotFound, got)
	})
}

func assertStrings(t testing.TB, want, got string) {
	t.Helper()

	if want != got {
		t.Errorf("expected %q got %q", want, got)
	}
}

func assertError(t testing.TB, want, got error) {
	t.Helper()

	if want != got {
		t.Errorf("expected error %q got %q", want, got)
	}
}
