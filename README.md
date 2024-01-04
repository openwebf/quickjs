quickjs
---

![linux ci](https://github.com/openwebf/quickjs/actions/workflows/linux.yml/badge.svg)

> Optimized quickjs mantained by OpenWebF team.

### Optimizations

In addition to the relevant features and optimizations in the [TODO](https://github.com/openwebf/quickjs/blob/master/TODO) file, the more important optimizations are:

- [x] Column number
- [ ] Basic Debugger API
- [x] Poly IC
  - [x] Self Poly IC
  - [x] Prototype Poly IC 
- [x] Replace malloc To [mimalloc](https://github.com/microsoft/mimalloc)
- [ ] Improve The Performance Of GC

In our plan, we first complete the above optimizations and then gradually add the remaining parts.

### How To Build

1. Clone this repo and its submodules by doing `git clone --recursive <THIS_REPO_URL>`
2. `mkdir build`
3. `cd build`
4. `cmake ..`
5. `make -j4`

you can find `libquickjs.a` in lib folder and `qjs` / `qjsc` / `run-test262` in the `./bin` folder (from the repo root).


### How To Run Test262

```shell
> bash scripts/test.sh
```

It will output result like:
```
Result: 573/75124 errors, 1388 excluded, 7844 skipped, 573 new
```

### Benchmark

> - Apple M1 Pro
> - macOS Monterey 12.2.1
> - Clang 13.0.0 arm64-apple-darwin21.3.0

|               | openwebf/quickjs ([32acbde](https://github.com/openwebf/quickjs/tree/32acbdebc733c4ce7e2ad3d77b9d85318834896b))    | bellard/quickjs ([3ab1c2b](https://github.com/bellard/quickjs/tree/3ab1c2b3148d1c70181607002aac23ecdd2ad482))       | Improvement(%) |
| ------------- | ---------- | ---------- |---------- |
| DeltaBlue      | 1382        | 1021       | +35.35 |
| RayTrace        | 1935        | 688       | +181.15 |
| RegExp      | 353        | 255       | +38.43 |
| NavierStokes  | 2756        | 2658       | +3.68  |
| PdfJS     | 4934        | 3692       | +33.64 |
| Gameboy   | 9948        | 9057| +9.83 |
| Box2D   | 5264        | 4089| +28.77 |
| Typescript  | 19108        | 13787| +38.59 |
| Total Score | 3262        | 2339| +39.46 |
| File Size(KB) | 1.5M        | 1.3M        | -15.38% |