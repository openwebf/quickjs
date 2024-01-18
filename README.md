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
- [ ] Improving The Performance Of GC
- [ ] Optimizing Opcode Bytecode

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
Result: 443/75250 errors, 1392 excluded, 7972 skipped, 443 new
```

### Benchmark

> - AMD EPYC 7763 64-Core Processor(L1d cache: 32 KiB)
> - Linux codespaces-8a2c03 6.2.0-1018-azure
> - GCC (Ubuntu 9.4.0-1ubuntu1~20.04.2) 9.4.0

|               | openwebf/quickjs ([0c1fa5a](https://github.com/openwebf/quickjs/tree/0c1fa5a42da11f65bd54e812c49b9caf3e0a351a))    | bellard/quickjs ([3f81070](https://github.com/bellard/quickjs/tree/3f81070e573e3592728dbbbd04c84c498b20d6dc))       | Improvement(%) |
| ------------- | ---------- | ---------- |---------- |
| Richards      | 780        | 644       | +21.12 |
| DeltaBlue     | 745        | 673       | +10.70 |
| Crypto        | 645        | 759       | -15.02 |
| RayTrace      | 1130       | 858       | +31.70 |
| EarleyBoyer   | 1694       | 1333       | +27.09 |
| RegExp        | 248        | 204       | +21.57 |
| Splay         | 1976       | 1711      | +15.49 |
| SplayLatency  | 7109       | 5574      | +27.54 |
| NavierStokes  | 1322       | 1418      | -6.77  |
| PdfJS         | 2989       | 2406      | +24.23 |
| Mandreel      | 572        | 612       | -6.54  |
| MandreelLatency | 4343     | 4369      | -0.60  |
| Gameboy       | 5191       | 4624      | +12.26 |
| CodeLoad      | 13113      | 12279     | +6.80  |
| Box2D         | 2787       | 2424      | +14.97 |
| Typescript    | 8825       | 8390      | +5.18  |
| Score (version 9) | 1942    | 1750      | +10.97 |
