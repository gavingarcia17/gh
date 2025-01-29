// Write code to create a function that accepts an array numbers
// Return `true` if no number appears in the array more than once, else return `false`

var isUnique = function(arr) {
  var numSet = new Set(arr);
  return numSet.size === arr.length;
};
