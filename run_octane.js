import * as std from "std";
const { printf } = std;

BenchmarkSuite.config.doWarmup = undefined;
BenchmarkSuite.config.doDeterministic = undefined;

var success = true;
function PrintResult(name, result) {
  printf((name + "                      ").substr(0, 20) + ": " + result + "\n");
}

function PrintError(name, error) {
  PrintResult(name, error);
  success = false;
}

function PrintScore(score) {
  printf("----\n");
  printf("Score (version " + BenchmarkSuite.version + "): " + score);
}

BenchmarkSuite.RunSuites({
  NotifyResult: PrintResult,
  NotifyError: PrintError,
  NotifyScore: PrintScore,
});
