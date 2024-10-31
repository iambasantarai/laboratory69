package main

import "testing"

func TestHello(t *testing.T) {
	t.Run("saying hello to people", func(t *testing.T) {
		got := Hello("Basanta", "")
		want := "Hello, Basanta."

		assertCorrectMessage(t, got, want)
	})

	t.Run("say 'Hello, world.' if empty string is provided", func(t *testing.T) {
		got := Hello("", "")
		want := "Hello, World."

		assertCorrectMessage(t, got, want)
	})

	t.Run("in spanish", func(t *testing.T) {
		got := Hello("Bruce", "Spanish")
		want := "Hola, Bruce."

		assertCorrectMessage(t, got, want)
	})

	t.Run("in french", func(t *testing.T) {
		got := Hello("Bruce", "French")
		want := "Bonjour, Bruce."

		assertCorrectMessage(t, got, want)
	})
}

func assertCorrectMessage(t testing.TB, got, want string) {
	t.Helper()
	if got != want {
		t.Errorf("got %q want %q", got, want)
	}
}
