#!/bin/bash

path=`readlink -m "$0"` | sed 's/\/test$//'
if [[ `grep -Fq "STATIC_ROOT" "$path/local_settings.py" 2> /dev/null` ]]
then 
  echo "STATIC_ROOT already in local_settings.py. Please edit manually."
else 
  echo "STATIC_ROOT = '$path/static'" >> $path/local_settings.py;
fi
