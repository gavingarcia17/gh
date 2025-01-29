// Include packages needed for this application
import inquirer from 'inquirer';
import fs from 'fs';
import generateMarkdown from './02-Challenge/public/generateMarkdown.js';

// Create an array of questions for user input
const questions = [
    {
        type: 'input',
        name: 'title',
        message: 'What is the title of your project?',
    },
    {
        type: 'input',
        name: 'description',
        message: 'Provide a description of your project:',
    },
    {
        type: 'input',
        name: 'installation',
        message: 'What are the installation instructions?',
    },
    {
        type: 'input',
        name: 'usage',
        message: 'What is the usage information?',
    },
    {
        type: 'input',
        name: 'contributing',
        message: 'What are the contribution guidelines?',
    },
    {
        type: 'input',
        name: 'tests',
        message: 'What are the test instructions?',
    },
    {
        type: 'input',
        name: 'github',
        message: 'What is your GitHub username?',
    },
    {
        type: 'input',
        name: 'email',
        message: 'What is your email address?',
    }
];

// Function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, (err) =>
        err ? console.error(err) : console.log('Success! Your README.md file has been generated.')
    );
}

// Function to initialize app
function init() {
    inquirer.prompt(questions)
        .then((answers) => {
            const markdown = generateMarkdown(answers);
            writeToFile('README.md', markdown);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}

// Function call to initialize app
init();