// Write code to create a function that accepts two strings
// Return true if the strings are anagrams of each other, otherwise return false

var isAnagram = function(strA, strB) {
  // Remove non-alphabetic characters and convert to lowercase
  var normalize = function(str) {
	return str.replace(/[^a-zA-Z]/g, '').toLowerCase().split('').sort().join('');
  };

  return normalize(strA) === normalize(strB);
};
