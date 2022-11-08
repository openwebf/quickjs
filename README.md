quickjs
---

> optimized quickjs mantained by OpenWebF team.

### How To Build

```shell
> mkdir build
> cd build
> cmake .. && make -j4
```

you can find `libquickjs.a` in lib dictory and `qjs` / `qjsc` / `run-test262` in bin dictory.


### How To Run Test262

```shell
> git clone https://github.com/tc39/test262.git test262
> cd test262
> patch -p1 < ../tests/test262.patch
> cd ..
> touch test262_errors.txt
> ./bin/run-test262 -m -c test262.conf -a
```

it will output result like:
```
Result: 573/75124 errors, 1388 excluded, 7844 skipped, 573 new
```