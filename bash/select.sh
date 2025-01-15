#!/bin/bash

operations='Read Write Edit Delete Quit'
PS3='Select operation: '
select operation in $operations; do
    if [ $operation == 'Quit' ]; then
        break
    fi

    echo $operation
done

echo Bye
