package maps

import "testing"

func TestDictionary(t *testing.T) {
	dictionary := map[string]string{"test": "this is a test"}

	got := Search(dictionary, "test")
	want := "this is a test"

	assertStrings(t, want, got)
}

func assertStrings(t testing.TB, want, got string) {
	t.Helper()

	if want != got {
		t.Errorf("expected %q got %q", want, got)
	}
}
