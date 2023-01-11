cmake_minimum_required(VERSION 3.9.4)
project(QUICKJS)
set(C_STANDARD 17)
set(CMAKE_EXPORT_COMPILE_COMMANDS ON)

include(CheckIPOSupported)
check_ipo_supported(RESULT supported OUTPUT error)
if( supported )
    set(CMAKE_INTERPROCEDURAL_OPTIMIZATION TRUE)
endif()

set(EXECUTABLE_OUTPUT_PATH ${PROJECT_SOURCE_DIR}/bin)
set(LIBRARY_OUTPUT_PATH ${PROJECT_SOURCE_DIR}/lib)

include_directories(${PROJECT_SOURCE_DIR})
include_directories(${PROJECT_SOURCE_DIR}/include)
add_subdirectory(src)

set(COMPILE_FLAGS -Wall -MMD -Wno-array-bounds -Wno-format-truncation)
if (CMAKE_BUILD_TYPE STREQUAL "Debug")
    set(COMPILE_FLAGS ${COMPILE_FLAGS} -g)
elseif(CMAKE_BUILD_TYPE STREQUAL "Release")
    set(COMPILE_FLAGS ${COMPILE_FLAGS} -O2)
endif()

if (UNIX)
    set(LINK_LIBRARIES m pthread dl)
elseif(WIN32)
    set(LINK_LIBRARIES m pthread)
endif()

add_compile_options(${COMPILE_FLAGS})
add_compile_definitions(
    _GNU_SOURCE
    CONFIG_BIGNUM
    CONFIG_VERSION=${QUICKJS_VERSION}
)

set(QJSC_CONFIG -DCONFIG_PREFIX="/usr/local" -DCONFIG_LTO)
set(QJSC_EXE "${EXECUTABLE_OUTPUT_PATH}/qjsc")
if(UNIX OR WIN32)
    set(QJS_CONFIG ${QJSC_CONFIG} -DCONFIG_CC="gcc")
else()
    set(QJS_CONFIG ${QJSC_CONFIG} -DCONFIG_CC="clang")
endif()

if(WIN32)
    set(QJSC_EXE "${QJSC_EXE}.exe")
endif()

add_executable(qjsc qjsc.c quickjs-libc.c)
target_link_libraries(qjsc quickjs ${LINK_LIBRARIES})
target_compile_definitions(qjsc PUBLIC ${QJSC_CONFIG})

add_custom_command(
    TARGET qjsc POST_BUILD
    COMMAND ${QJSC_EXE} -c -o ${PROJECT_SOURCE_DIR}/repl.c -m ${PROJECT_SOURCE_DIR}/repl.js
    COMMAND ${QJSC_EXE} -fbignum -c -o ${PROJECT_SOURCE_DIR}/qjscalc.c ${PROJECT_SOURCE_DIR}/qjscalc.js
)

add_executable(qjs qjs.c quickjs-libc.c repl.c qjscalc.c)
target_link_libraries(qjs quickjs ${LINK_LIBRARIES})

add_executable(run-test262 run-test262.c quickjs-libc.c)
target_link_libraries(run-test262 quickjs ${LINK_LIBRARIES})