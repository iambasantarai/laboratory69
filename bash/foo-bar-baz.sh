#!/bin/bash

if (($1 % 3 == 0)) && (($1 % 5 == 0)); then
    echo baz
elif (($1 % 3 == 0)); then
    echo foo
elif (($1 % 5 == 0)); then
    echo bar
else
    echo none
fi
