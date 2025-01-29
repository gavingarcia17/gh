class Shape {
  constructor(text, textColor, shapeColor) {
    this.text = text;
    this.textColor = textColor;
    this.shapeColor = shapeColor;
  }
}

class Triangle extends Shape {
  render() {
    return `
      <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
        <polygon points="150,10 10,190 290,190" fill="${this.shapeColor}" />
        <text x="150" y="125" font-size="60" text-anchor="middle" fill="${this.textColor}">${this.text}</text>
      </svg>
    `;
  }
}

class Circle extends Shape {
  render() {
    return `
      <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
        <circle cx="150" cy="100" r="80" fill="${this.shapeColor}" />
        <text x="150" y="125" font-size="60" text-anchor="middle" fill="${this.textColor}">${this.text}</text>
      </svg>
    `;
  }
}

class Square extends Shape {
  render() {
    return `
      <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
        <rect x="60" y="20" width="180" height="180" fill="${this.shapeColor}" />
        <text x="150" y="125" font-size="60" text-anchor="middle" fill="${this.textColor}">${this.text}</text>
      </svg>
    `;
  }
}

export { Triangle, Circle, Square };