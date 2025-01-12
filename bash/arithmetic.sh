#!/bin/bash

let sum=5+5
let product=$sum\*$1
difference=$(expr $sum - $1)

echo sum: $sum
echo "$sum multiplied by $1 is $product"
echo "$sum minus $1 is $difference"
