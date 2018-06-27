function solution(matrix) {
  var boundary = {
    left: 0,
    right: matrix[0].length - 1,
    top: 0,
    bottom: matrix.length - 1,
  };

  var tracer = {
    x: 0,
    y: 0,
    dx: 1,
    dy: 0,
  };

  var upperSpiralSum = 0;

  while (true) {
    var currentItem = getCurrentItem(matrix, tracer);

    // console.group('iteration' + i)
    // console.log(currentItem);
    // console.log(tracer);
    // console.log(boundary);
    // console.groupEnd();

    if (typeof currentItem !== 'number') {
      // console.log('currentItem is not a number; breaking out of loop!');
      break;
    }

    upperSpiralSum += currentItem;

    moveTracer(tracer);

    if (!checkBoundary(tracer, boundary)) {
      // console.log('area negative; breaking out of loop');
      break;
    }
  }

  return upperSpiralSum;
}

function getCurrentItem(matrix, tracer) {
  if (typeof matrix[tracer.y][tracer.x] === 'number') {
    return matrix[tracer.y][tracer.x];
  } else {
    return undefined;
  }
}

function moveTracer(tracer) {
  tracer.x += tracer.dx;
  tracer.y += tracer.dy;
}

// Return false if bounding area is negative.
// Return true otherwise after performing other detections
// and setting up the directions accordingly.
function checkBoundary(tracer, boundary) {
  // return false if area is negative
  if (boundary.top > boundary.bottom || boundary.left > boundary.right) {
    // console.log('area negative');
    return false;
  }

  if (tracer.dx === 1 && tracer.x >= boundary.right) {
    // if moving right and struck the right boundary
    tracer.dx = 0;
    tracer.dy = 1;
    boundary.top++;
    boundary.bottom--;
  } else if (tracer.dy === 1 && tracer.y >= boundary.bottom) {
    tracer.dx = -1;
    tracer.dy = 0;
    boundary.left++;
    boundary.right--;
  } else if (tracer.dx === -1 && tracer.x <= boundary.left) {
    tracer.dx = 0;
    tracer.dy = -1;
    boundary.top++;
    boundary.bottom--;
  } else if (tracer.dy === -1 && tracer.y <= boundary.top) {
    tracer.dx = 1;
    tracer.dy = 0;
    boundary.left++;
    boundary.right--;
  }

  return true;
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

