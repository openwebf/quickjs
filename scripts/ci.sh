#!/bin/bash

set -x

mkdir build
cd build
cmake -DCMAKE_BUILD_TYPE=Release ..
make -j4
make -j4 # POST_BUILD
cd ..
bash scripts/test.sh