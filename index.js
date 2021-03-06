const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

const promptUser = () =>
  inquirer.prompt([
    {
      type: "input",
      name: "username",
      message: "What is your Github username?",
    },
    {
      type: "input",
      name: "email",
      message: "What is your email address?",
    },
    {
      type: "input",
      name: "project",
      message: "What is your projects's name?",
    },
    {
      type: "input",
      name: "description",
      message: "A short description about your project.",
    },
    {
      type: "list",
      name: "license",
      message: "What kind of license should your project have?",
      choices: ["MIT", "Apache", "GNU GPLv3"],
    },
    {
      type: "input",
      name: "test",
      message: "What command should be run to run tests?",
    },
    {
      type: "input",
      name: "using",
      message: "What does the user need to know about using the repo?",
    },
    {
      type: "input",
      name: "contribute",
      message:
        "What does the user need to know about contributing to the repo?",
    },
  ]);

const generateReadMe = (answers) => {
  let badge = "";
  switch (answers.license) {
    case "MIT":
      badge =
        "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";
      break;
    case "Apache":
      badge = "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)";
      break;
    case "GNU GPLv3":
      badge = "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)";
      break;
  }

  return `# ${answers.project}

${badge}
  
## Description
  
${answers.description}
  
## Table of Contents
  
* [Installation](#installation)
  
* [Usage](#usage)
  
* [License](#license)
  
* [Contributing](#contributing)
  
* [Tests](#tests)
  
* [Questions](#questions)
  
## Installation
  
To install necessary dependencies, run the following command:
  
  
npm i
  
  
## Usage
  
${answers.using}
  
## License
  
This project is licensed under the ${answers.license} license.
  
## Contributing
  
${answers.contribute}
  
## Tests
  
To run tests, run the following command:
  
  
${answers.test}
  
  
## Questions
  
If you have an questions about the repo, you can contact me directly at ${answers.email}. 
You can find more of my work at [${answers.username}](https://github.com/${answers.username}).`;
};

promptUser().then((answers) => {
  fs.writeFileSync("Generating.md", generateReadMe(answers));
  console.log("Generating ReadMe...");
});
