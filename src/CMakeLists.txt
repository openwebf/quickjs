add_library(quickjs
    libbf.c
    cutils.c
    libregexp.c
    libunicode.c
    core/string.c
    core/function.c
    core/memory.c
    core/bytecode.c
    core/object.c
    core/exception.c
    core/gc.c
    core/malloc.c
    core/shape.c
    core/parser.c
    core/convertion.c
    core/runtime.c
    core/module.c
    core/builtins/js-array.c
    core/builtins/js-async-function.c
    core/builtins/js-async-generator.c
    core/builtins/js-atomics.c
    core/builtins/js-big-num.c
    core/builtins/js-boolean.c
    core/builtins/js-date.c
    core/builtins/js-function.c
    core/builtins/js-generator.c
    core/builtins/js-json.c
    core/builtins/js-map.c
    core/builtins/js-math.c
    core/builtins/js-number.c
    core/builtins/js-object.c
    core/builtins/js-closures.c
    core/builtins/js-operator.c
    core/builtins/js-promise.c
    core/builtins/js-proxy.c
    core/builtins/js-reflect.c
    core/builtins/js-regexp.c
    core/builtins/js-string.c
    core/builtins/js-symbol.c
    core/builtins/js-typed-array.c
)

execute_process(
    COMMAND cat ../VERSION
    OUTPUT_VARIABLE QUICKJS_VERSION
)

target_compile_options(quickjs PUBLIC
    -g
    -D_GNU_SOURCE
    -DCONFIG_BIGNUM
    -DCONFIG_VERSION=${\"QUICKJS_VERSION\"}
)