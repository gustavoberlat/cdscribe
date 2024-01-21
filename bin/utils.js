// Import required modules
const fs = require('fs');
const { globSync } = require('glob');


// Function Init
function Init(){

  // Create a Folder Called Cdscribe
  fs.mkdir('Cdscribe', (err) => {
    if (err) {
        if (err.code === 'EEXIST') {
          WriteCliMessage(2); 
          console.log('Init Executed')
          console.error('Cdscribe Folder already exists!');
        }
    }

    else {
      WriteCliMessage(0); 
      console.log('Cdscribe Folder created successfully!');
    }
  })
}

// Function to validate command line arguments
function ArgvValidator(args) {
  // Check if at least one argument is provided
  if (args.length < 1) {
    this.WriteCliMessage(2);
    console.log('Error: Missing required argument: filename');
	  console.log('Usage: cdscribe <filename> <@blade>');

    return false;
  }

  else if(args.length === 1){
    // --init
    if(args[0] == "--init"){
      Init();
      return false;
    }

  }

  // Check if more than one argument is provided
  else if (args.length > 1) {
    let blade = args[1];
    // Check if blade starts with '@'
    if (blade.substring(0, 1) !== '@') {
      this.WriteCliMessage(2);
      console.error("Error: Blade should start with @");
      console.log('Usage: cdscribe <filename> <@blade>');

      return false;
    }
    return true;
  }

  // If no errors are found, return true
  return true;
}

// Function to display CLI messages
function WriteCliMessage(type, filename, blade) {

  if(type === 0){
    console.log(`\x1b[35m-- CDSCRIBE | Init Success --\x1b[0m`);
  }

  if(type === 1){
    // Display success message with filename 
    if (filename && !blade) {
      console.log(`\x1b[35m-- CDSCRIBE | ${filename} --\x1b[0m`);
    }

    // Display success message with filename and blade
    else if (filename && blade) {
      console.log(`\x1b[35m-- CDSCRIBE | ${filename} | ${blade} --\x1b[0m`);
    }
  }
  // Display error message
  else if(type === 2) {
    console.log('-- CDSCRIBE | Error --');
  }

  



}

// Async function to get file path from command line argument
async function GetFilePath(filename) {
  try {

    // Use glob to search for files matching pattern "cdscribe/**/filename.cdscribe"
    const Cdscribefiles = globSync(`Cdscribe/**/${filename}.cdscribe`, { ignore: 'node_modules/**' });

    // If at least one file is found, return the first file path
    if (Cdscribefiles.length > 0) {
      return Cdscribefiles[0];
    } else {
      this.WriteCliMessage(2);
      console.error('Error: File not found');
      return null;
    }
  } catch (error) {

    // Display error message and return null
    this.WriteCliMessage(2);
    console.error('Error: ', error.message);
    return null;
  }
}

// Function to read file content from file path
function ReadFile(filepath) {
  try {

    // Read file content and return as a string
    const data = fs.readFileSync(filepath, 'utf8');
    return data;
  } catch (error) {

    // Display error message and return null
    this.WriteCliMessage(2);
    console.error('Error: File not found');
    return null;
  }
}

// Export functions from module
module.exports = { GetFilePath, ReadFile, WriteCliMessage, ArgvValidator };