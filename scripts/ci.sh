#!/bin/bash

set -x

mkdir build
cd build
cmake -DCMAKE_BUILD_TYPE=Release .. && make -j4
cd ..
bash scripts/test.sh