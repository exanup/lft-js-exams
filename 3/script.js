function solution(matrixOriginal) {
  var matrix = JSON.parse(JSON.stringify(matrixOriginal)); // deep copy
  var upperSpiral = [];
  // var lowerSpiral = [];

  while (!isEmpty(matrix)) {
    // remove the upper row of the matrix (updating the original matrix) and return it
    var upperRow = popUpperRow(matrix);
    upperSpiral = upperSpiral.concat(upperRow);

    if (!isEmpty(matrix)) {
      // remove the bottom row of the matrix (updating the original matrix) and return it
      var bottomRow = popBottomRow(matrix);
      // lowerSpiral = lowerSpiral.concat(bottomRow);

      if (!isEmpty(matrix)) {
        matrix = rotateMatrixCounterClockWise(matrix);
      }
    }
  }

  var sumOfUpperSpiral = addNumbers(upperSpiral);
  return sumOfUpperSpiral;
}

function isEmpty(matrix) {
  return (matrix.length === 0);
}

function popUpperRow(matrix) {
  return matrix.shift();
}

function popBottomRow(matrix) {
  return matrix.pop();
}

function rotateMatrixCounterClockWise(matrix) {
  var rows = numRows(matrix);
  var cols = numCols(matrix);

  var rotatedMatrix = createEmptyMatrix(cols, rows);

  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      rotatedMatrix[cols - j - 1][i] = matrix[i][j];
    }
  }

  return rotatedMatrix;
}

function numRows(matrix) {
  return matrix.length;
}

function numCols(matrix) {
  return (matrix[0] !== undefined ? matrix[0].length : 0);
}

function createEmptyMatrix(rows, cols) {
  var matrix = [];
  for (var i = 0; i < rows; i++) {
    matrix[i] = [];
    for (var j = 0; j < cols; j++) {
      matrix[i][j] = 0;
    }
  }
  return matrix;
}

function displayMatrix(matrix) {
  var rows = numRows(matrix);
  var cols = numCols(matrix);

  console.log('rows =', rows, 'cols =', cols);

  for (var i = 0; i < numRows(matrix); i++) {
    var line = ' ';
    for (var j = 0; j < numCols(matrix); j++) {
      line += matrix[i][j] + ' ';
    }
    console.log(line);
  }
}

function addNumbers(numbers) {
  return (
    numbers.length > 0 ?
    numbers.reduce(function (acc, curr) {
      return (acc + curr);
    }) :
    0
  );
}

var matrix = [
  [5, 3, 8, 9, 4, 1, 3, -2],
  [4, 6, 0, 3, 6, 4, 2, 1],
  [4, -5, 3, 1, 9, 5, 6, 6],
  [3, 7, 5, 3, 2, 8, 9, 4],
  [5, 3, -3, 6, 3, 2, 8, 0],
  [5, 7, 5, 3, 3, -9, 2, 2],
  [0, 4, 3, 2, 5, 7, 5, 4]
];

console.group('Solution');
console.log(solution(matrix));
console.log("Original matrix should be intact.");
console.log(matrix);
console.groupEnd();

console.group('Benchmark');
var benchmarkRepeat = 10000;
console.log('Test: running same function on given matrix for ' + benchmarkRepeat + ' times for each measurement');
for (var i = 0; i < 20; i++) {
  console.time();
  for (var j = 0; j < 10000; j++) {
    solution(matrix);
  }
  console.timeEnd();
}
console.groupEnd();

