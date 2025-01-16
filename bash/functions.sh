#!/bin/bash

greet() {
    echo "$1 $2, from greet fn"
}

greet Namaste John
greet Sewa Layla
greet Ola Cristin

file_lines_counter() {
    cat $1 | wc -l
}

lines=$(file_lines_counter $1)
echo The file $1 has $lines no of lines in it.
