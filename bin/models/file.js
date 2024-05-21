const fs = require('fs');
const { glob } = require('glob');
const CLIMessages = require('./cli-messages.js') 


function Init () {
  fs.mkdir('Cdscribe', (err) => {
    if (err){
      if (err.code === 'EEXIST') {
        CLIMessages.Error();
        console.log('Init Executed');
        console.log('Cdscribe Folder already exists!');
      } else {
        CLIMessages.Error();
        console.error('Error creating Cdscribe Folder:', err);
      } 
    } else {
      CLIMessages.Init();
      console.log('Cdscribe Folder created successfully!');
    }
  });
}

//Async function to get file path from command line argument
async function GetFilePath (filename) {
  try {
    //Use glob to search for files matching pattern "cdscribe/**/filename.cdscribe"
    const Cdscribefiles = await glob(`Cdscribe/**/${filename}.cdscribe`, { ignore: 'node_modules/**' });

    //If at least one file is found, return the first file path
    if (Cdscribefiles.length > 0) {
      return Cdscribefiles[0];
    } else {
      CLIMessages.Error();
      console.error('Error: File not found');
      
      return null;
    }
  } catch (error) {
    //Display error message and return null
    CLIMessages.Error();
    console.error('Error: ', error.message);
    
    return null;
  }
}

//Function to read file content from file path
function ReadFile (filepath) {
  try {
    //Read file content and return as a string
    const data = fs.readFileSync(filepath, 'utf8');
    
    return data;
  } catch (error) {
    //Display error message and return null
    CLIMessages.Error();
    console.error('Error: File not found');

    return null;
  }
}

module.exports = { Init, GetFilePath, ReadFile }