#!/bin/bash

rand_word=$(cat ./data.txt | shuf -n 1)
echo "random word: $rand_word"

word_len=$1
filtered_word=$(grep -E "^.{${word_len}}$" ./data.txt | shuf -n 1)
echo "$filtered_word"
