package main

import (
	"fmt"
	"unsafe"
)

func main()  {
    size_int := int(69)
    size_int8 := int8(69)
    size_int16 := int16(69)
    size_int32 := int32(69)
    size_int64 := int64(69)

    size_uint := uint(69)
    size_uint8 := uint8(69)
    size_uint16 := uint16(69)
    size_uint32 := uint32(69)
    size_uint64 := uint64(69)

    size_float32 := float32(69)
    size_float64 := float64(69)

    size_bool := bool(true)
    size_string := string("sixty nine")


    // byte -> alias for uint8
    size_byte := byte(69)
    // rune -> alias for int32
    size_rune := rune(69)

    size_complex64 := complex64(69)
    size_complex128 := complex128(69)

    fmt.Printf("Size of %T is %d\n", size_int, unsafe.Sizeof(size_int))
    fmt.Printf("Size of %T is %d\n", size_int8, unsafe.Sizeof(size_int8))
    fmt.Printf("Size of %T is %d\n", size_int16, unsafe.Sizeof(size_int16))
    fmt.Printf("Size of %T is %d\n", size_int32, unsafe.Sizeof(size_int32))
    fmt.Printf("Size of %T is %d\n", size_int64, unsafe.Sizeof(size_int64))
    fmt.Printf("Size of %T is %d\n", size_uint, unsafe.Sizeof(size_int))
    fmt.Printf("Size of %T is %d\n", size_uint8, unsafe.Sizeof(size_int8))
    fmt.Printf("Size of %T is %d\n", size_uint16, unsafe.Sizeof(size_int16))
    fmt.Printf("Size of %T is %d\n", size_uint32, unsafe.Sizeof(size_int32))
    fmt.Printf("Size of %T is %d\n", size_uint64, unsafe.Sizeof(size_uint64))
    fmt.Printf("Size of %T is %d\n", size_float32, unsafe.Sizeof(size_float32))
    fmt.Printf("Size of %T is %d\n", size_float64, unsafe.Sizeof(size_float64))
    fmt.Printf("Size of %T is %d\n", size_bool, unsafe.Sizeof(size_bool))
    fmt.Printf("Size of %T is %d\n", size_string, unsafe.Sizeof(size_string))
    fmt.Printf("Size of %T is %d\n", size_byte, unsafe.Sizeof(size_byte))
    fmt.Printf("Size of %T is %d\n", size_rune, unsafe.Sizeof(size_rune))
    fmt.Printf("Size of %T is %d\n", size_complex64, unsafe.Sizeof(size_complex64))
    fmt.Printf("Size of %T is %d\n", size_complex128, unsafe.Sizeof(size_complex128))
}
