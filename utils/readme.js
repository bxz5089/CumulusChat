// imports
const inquirer = require('inquirer');
const fs = require('fs');

// Questions asked to the user
const questions = [
  {
    type: 'input',
    message: 'What are the GitHub usernames of those who worked on this project?',
    name: 'UserName',
  },
  {
    type: 'input',
    message: 'What are the emails of those who worked on this project?',
    name: 'Email',
  },

  {
    type: 'input',
    message: 'What is the title for your project?',
    name: 'Title',
  },
  {
    type: 'input',
    message: 'Please give description of your project.',
    name: 'Description',
  },
  {
    type: 'input',
    message: 'What necessary dependencies must be installed to run this app?',
    name: 'Installation',
  },
  {
    type: 'input',
    message: 'What is this app used for?',
    name: 'Usage',
  },
  {
    type: 'input',
    message: 'What license was used for this project?',
    name: 'License',
  },

  {
    type: 'input',
    message: 'Please add contributors',
    name: 'Contributor',
  },
  {
    type: 'input',
    message: 'What command do you use to test this App?',
    name: 'Jest',
  }
];

function generateMarkdown(data) {
  return`
##CUMULUS CHAT
 ${data.Title}
 ![Github licence](http://img.shields.io/badge/license-${data.license}-blue.svg)
${data.UserName}
## Description
${data.Description}
## Table of Contents 
* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Contributing](#contributing)
* [Tests](#tests)
* [Questions](#questions)
## Installation
The following necessary dependencies must be installed to run the application properly: ${data.Installation}
# Usage
​This application is used for ${data.Usage}
# License
This project is license under the ${data.License} license.
## Contributing
​Contributors: ${data.Contributor}
## Tests
To run tests, you need to run the following command: ${data.Test}
# Questions
If you have any questions about the repo, open an issue or contact ${data.UserName} directly ${data.Email}.
`;
}

//Writing to a file

function writeToFile(fileName, data) {

  fs.writeFile('../utils/'+fileName, data, function(err) {
    if (err) {
      return console.log(err);
    }
    console.log ('Successfully wrote: ' + fileName);

  });

}


// initialization function
function init() {
  inquirer.prompt(questions)
    .then(function(data) {
      writeToFile('README.md',generateMarkdown(data));
    });
}


// run the app
init();