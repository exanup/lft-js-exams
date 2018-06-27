// provided a number, calculate the sum of multiplication of numbers at edges until you get a single number
function solution(num) {
  while( parseInt(num / 10) != 0 ) {
    var numStr = num.toString();
    var numLen = numStr.length;

    var sumOfProduct = 0;
    for (var i = 0; i < numLen / 2; i++) {
      var leftIndex = i;
      var rightIndex = numLen - i - 1;

      var leftDigit = parseInt(numStr[leftIndex]);
      var rightDigit = parseInt(numStr[rightIndex]);

      var product = (leftIndex != rightIndex ? leftDigit * rightDigit : leftDigit);
      sumOfProduct += product;
    }
    num = sumOfProduct;
  }
  return num;
}

var testData = [101, 12021, 78952, 1234];

testData.forEach(function(num) {
  console.log(solution(num));
});
