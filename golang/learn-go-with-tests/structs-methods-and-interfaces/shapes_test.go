package structsmethodsandinterfaces

import (
	"testing"
)

func TestPerimeter(t *testing.T) {
	rectangle := Rectangle{10.0, 10.0}
	got := Perimeter(rectangle)
	want := 40.0

	if got != want {
		t.Errorf("expected '%.2f', got '%.2f'", want, got)
	}
}

func TestArea(t *testing.T) {
	checkArea := func(t testing.TB, shape Shape, want float64) {
		t.Helper()
		got := shape.Area()

		if got != want {
			t.Errorf("expected '%g', got '%g'", want, got)
		}
	}

	t.Run("rectangles", func(t *testing.T) {
		rectangle := Rectangle{2.0, 10.0}
		checkArea(t, rectangle, 20.0)
	})

	t.Run("circles", func(t *testing.T) {
		circle := Circle{10}
		checkArea(t, circle, 314.1592653589793)
	})

	areaTests := []struct {
		shape Shape
		want  float64
	}{
		{shape: Rectangle{Width: 2.0, Height: 10.0}, want: 20.0},
		{shape: Circle{Radius: 10.0}, want: 314.1592653589793},
		{shape: Triangle{Base: 12, Height: 6}, want: 36.0},
	}

	for _, tt := range areaTests {
		got := tt.shape.Area()

		if got != tt.want {
			t.Errorf("expected '%g', got '%g'", tt.want, got)
		}
	}
}
