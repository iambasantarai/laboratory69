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
    echo $j
done
