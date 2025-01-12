#!/bin/bash

num1=$1
num2=$2
echo $((num1 * num2))

let rand_num=$RANDOM%100
echo "random number: $rand_num"
