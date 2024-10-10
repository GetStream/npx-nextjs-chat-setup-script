#!/usr/bin/env node
const yargs = require('yargs');
const readline = require('readline');

const { execSync } = require('child_process');

const fs = require('fs');
const path = require('path');

// TODO: repo is still private
const TEMPLATE_REPO_URL = 'https://github.com/GetStream/nextjs-chat-template';

// Function to execute commands
const execCommand = (command, options = {}) => {
  try {
    execSync(command, { stdio: 'inherit', ...options });
  } catch (error) {
    console.error(`Error executing command: ${command}`);
    process.exit(1);
  }
};

const getProjectName = async () => {
  let projectName = yargs.argv.name;

  if (!projectName) {
    const rl = createInterface();
    projectName = await askQuestion(rl, 'Enter project name: ');
    rl.close();
  }
  return projectName;
};

// Function to clone the repository
const setupRepository = async (projectName) => {
  execCommand(`git clone --depth=1 ${TEMPLATE_REPO_URL} ${projectName}`);

  const projectPath = path.join(process.cwd(), projectName);
  execCommand('npm install', { cwd: projectPath });

  fs.rmSync(path.join(projectPath, '.git'), { recursive: true });
  execCommand('git init', { cwd: projectPath });
  execCommand('git add .', { cwd: projectPath });
  execCommand('git commit -m "Initial commit"', { cwd: projectPath });
};

// Function to create a readline interface
const createInterface = () => {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
};

// Function to ask a question and get user input
const askQuestion = (rl, question) => {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
};

// Function to update file content
const updateFile = (filePath, searchValue, replaceValue) => {
  const content = fs.readFileSync(filePath, 'utf8');
  const updatedContent = content.replace(searchValue, replaceValue);
  fs.writeFileSync(filePath, updatedContent, 'utf8');
};

// Function to prompt user for customizations
const customizeProject = async (projectName) => {
  const projectPath = path.join(process.cwd(), projectName);
  const rl = createInterface();

  // Step 1: Update README.md
  updateFile(
    path.join(projectPath, 'README.md'),
    'Next.js Stream Chat Starter Template',
    projectName
  );

  console.log('==================================================');
  console.log('You now need to provide your Stream Chat API key and secret.\n');
  console.log(
    'You can get your Stream Chat API key and secret from the Stream Dashboard at: https://dashboard.getstream.io/ \n\n'
  );

  // Step 2: Ask for Stream Chat API key and secret
  const apiKey = await askQuestion(rl, 'Enter your Stream Chat API key: ');
  const apiSecret = await askQuestion(rl, 'Enter your Stream Chat secret: ');

  // Step 3: Create .env.local file
  const envLocalPath = path.join(projectPath, '.env.local');
  if (!fs.existsSync(envLocalPath)) {
    fs.appendFileSync(
      envLocalPath,
      `NEXT_PUBLIC_STREAM_API_KEY=${apiKey}\n`,
      'utf8'
    );
    fs.appendFileSync(envLocalPath, `STREAM_SECRET=${apiSecret}\n`, 'utf8');
  }

  console.log(
    'Created .env.local file with your Stream Chat API key and secret.\n\n'
  );
  console.log('==================================================');
  console.log(
    'Next, configure a new user on the dashboard and enter the credentials.\n'
  );

  // Step 4: Ask for userId and userName
  const userId = await askQuestion(rl, 'Enter the user ID: ');
  const userName = await askQuestion(rl, 'Enter the user name: ');

  // Step 5: Update App.tsx
  updateFile(
    path.join(projectPath, 'app/page.tsx'),
    'const userId = undefined;',
    `const userId = "${userId}";`
  );
  updateFile(
    path.join(projectPath, 'app/page.tsx'),
    'const userName = undefined;',
    `const userName = "${userName}";`
  );

  rl.close();

  printOutput('Project customized successfully.');
};

const printOutput = (output) => {
  console.log('==================================================');
  console.log(output);
  console.log('==================================================');
};

// Main function
const main = async () => {
  const projectName = await getProjectName();

  await setupRepository(projectName);

  await customizeProject(projectName);

  printOutput(
    `Next.js project initialized and customized successfully in ./${projectName}`
  );
};

// Run the main function
main().catch(console.error);
