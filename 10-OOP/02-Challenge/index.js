import inquirer from 'inquirer';
import fs from 'fs';
import path from 'path';
import { Triangle, Circle, Square } from './shape.js';

const questions = [
  {
    type: 'input',
    name: 'logoText',
    message: 'Enter the text for the logo (up to 3 characters):',
    validate: function(input) { return input.length <= 3 || 'Text must be up to 3 characters.'; }
  },
  {
    type: 'input',
    name: 'textColor',
    message: 'Enter the text color (color keyword or hexadecimal):'
  },
  {
    type: 'list',
    name: 'shape',
    message: 'Choose a shape for the logo:',
    choices: ['Triangle', 'Circle', 'Square']
  },
  {
    type: 'input',
    name: 'shapeColor',
    message: 'Enter the shape color (color keyword or hexadecimal):'
  }
];

inquirer.prompt(questions).then(function(answers) {
  const { logoText, textColor, shape, shapeColor } = answers;

  let svgContent = '';
  switch (shape) {
    case 'Triangle':
      svgContent = new Triangle(logoText, textColor, shapeColor).render();
      break;
    case 'Circle':
      svgContent = new Circle(logoText, textColor, shapeColor).render();
      break;
    case 'Square':
      svgContent = new Square(logoText, textColor, shapeColor).render();
      break;
  }

  const svgFilePath = path.join(process.cwd(), 'logo.svg');
  fs.writeFileSync(svgFilePath, svgContent);
  console.log('Generated logo.svg');
});