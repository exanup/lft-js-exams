// By Anup Dhakal

function findMostRepeatedCharacter(text) {
  var set = breakIntoCharacters(text);
  var currentLongestSet = set[0];
  for (var i = 1; i < set.length; i++) {
    var currentSet = set[i];
    if (currentSet.count >= currentLongestSet.count) {
      currentLongestSet = currentSet;
    }
  }
  return currentLongestSet;
}

function breakIntoCharacters(text) {
  textArr = text.split('');

  var result = [];

  var currLetter = textArr[0];
  var currRepeatCount = 1;
  for (var i = 1; i < textArr.length; i++) {
    letter = textArr[i];
    if (currLetter !== letter) {
      var set = {
        char: currLetter,
        count: currRepeatCount
      };
      result.push(set);
      currLetter = letter;
      currRepeatCount = 1;
    } else {
      currRepeatCount++;
    }
  }
  var set = {
    char: currLetter,
    count: currRepeatCount
  };
  result.push(set);

  // console.log(result);
  return result;
}

var texts = [
  'abccc',
  'bbcccbb',
  'aabbbbbcnnmz',
  'mjnuuiii123888888nnhujh',
  'ab00mj11',
  'abc'
];

texts.forEach(function (text) {
  console.log(findMostRepeatedCharacter(text));
});
