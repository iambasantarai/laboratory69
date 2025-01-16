#!/bin/bash

# normal function
greet() {
    echo "$1 $2, from greet fn"
}
greet Namaste John
greet Sewa Layla
greet Ola Cristin

# pass arguments
file_lines_counter() {
    cat $1 | wc -l
}

lines=$(file_lines_counter $1)
echo The file $1 has $lines no of lines in it.

# variable scopes
change_var() {
    local v1="Hey i\'m local"
    echo "inside change_var() fn accessing local variable $v1"
    v2="v2 changed from change_var() fn"
    v3="v3 changed from change_var() fn"
}

v2="v2 in global scope"
v3="v3 in global scope"

echo
echo Before function call
echo "v2: $v2 and v3: $v3"

change_var

echo
echo After function call
echo "v2: $v2 and v3: $v3"
