import { Triangle, Circle, Square } from './shape'; // Correct import path
import { describe, test, expect } from '@jest/globals';

describe('Shape classes', () => {
  test('Triangle renders correctly', () => {
    const triangle = new Triangle();
    triangle.setColor('blue');
    expect(triangle.render()).toEqual('<polygon points="150, 18 244, 182 56, 182" fill="blue" />');
  });

  test('Circle renders correctly', () => {
    const circle = new Circle();
    circle.setColor('green');
    expect(circle.render()).toEqual('<circle cx="150" cy="100" r="80" fill="green" />');
  });

  test('Square renders correctly', () => {
    const square = new Square();
    square.setColor('red');
    expect(square.render()).toEqual('<rect x="50" y="50" width="200" height="200" fill="red" />');
  });
});