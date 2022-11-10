#!/bin/bash

set -x

mkdir build
cd build
cmake .. && make -j4
cd ..
bash scripts/test.sh