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

func TestAdd(t *testing.T) {
	dictionary := Dictionary{}

	t.Run("new word", func(t *testing.T) {
		word := "test"
		definition := "this is a test"

		dictionary.Add(word, definition)

		assertDefinition(t, dictionary, word, definition)
	})

	t.Run("existing word", func(t *testing.T) {
		word := "test"
		definition := "this is a test"

		err := dictionary.Add(word, definition)

		assertError(t, err, ErrWordExists)
		assertDefinition(t, dictionary, word, definition)
	})
}

func TestUpdate(t *testing.T) {
	t.Run("existing word", func(t *testing.T) {
		word := "test"
		definition := "this is test"
		dictionary := Dictionary{word: definition}
		newDefinition := "updated test"

		err := dictionary.Update(word, newDefinition)

		assertError(t, nil, err)
		assertDefinition(t, dictionary, word, newDefinition)
	})

	t.Run("new word", func(t *testing.T) {
		word := "test"
		definition := "this is test"
		dictionary := Dictionary{}

		err := dictionary.Update(word, definition)

		assertError(t, ErrWordDoesNotExist, err)
	})
}

func TestDelete(t *testing.T) {
	word := "test"
	dictionary := Dictionary{word: "this is test"}

	dictionary.Delete(word)

	_, err := dictionary.Search(word)
	assertError(t, ErrNotFound, err)
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

func assertDefinition(t testing.TB, dictionary Dictionary, word, definition string) {
	t.Helper()

	got, err := dictionary.Search(word)
	if err != nil {
		t.Fatal("should find added word: ", err)
	}

	assertStrings(t, definition, got)
}
