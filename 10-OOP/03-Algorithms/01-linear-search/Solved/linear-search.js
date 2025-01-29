// Write code to create a function that accepts an array of numbers and a target number
// if the target number is present in the array, return its index
// else return -1
// You may not use the `indexOf`, `lastIndexOf` or `includes` methods

var linearSearch = function(arr, target) {
  // Loop through each element in the array
  for (var i = 0; i < arr.length; i++) {
    var currentNumber = arr[i];

    // Check if the current element is equal to the target
    if (currentNumber === target) {
      return i; // Return the index if found
    }
  }

  return -1; // Return -1 if the target is not found
};
