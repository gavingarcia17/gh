class Stack {
  // default value allows stack to initialize without an argument
  constructor(input = []) {
    this.container = input;
  }

  // adds an element to the top of the stack
  addToStack(item) {
    this.container.push(item);
  }

  // removes an element from the top of the stack
  removeFromStack() {
    return this.container.pop();
  }
}

module.exports = Stack;