#!/bin/bash

rand_word=$(cat ./data.txt | shuf -n 1)
echo $rand_word
