#!/bin/bash

numbers='1 2 3 4 5'
for number in $numbers; do
    echo $number
done

echo Numbers printed

echo
echo Using range
for i in {1..10}; do
    echo $i
done

echo
echo It is also possible, steps in a loop
for j in {69..0..5}; do
    if [ $j -eq 39 ]; then
        echo we reached $j as well
        continue
    fi
    echo $j
done

echo
echo A range alternative
for ((num = 1; num <= 5; num++)); do
    if [ $num -eq 2 ]; then
        echo $num
        break
    fi
    echo $num
done
