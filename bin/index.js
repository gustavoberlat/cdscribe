#! /usr/bin/env node

const CLIMessages = require('./models/cli-messages.js') 
const Validator = require('./models/validator.js')
const File = require('./models/file.js')

var filename, blade; 

// Receive the argvs
const args = Validator.Argv(process.argv.slice(2, 4));

if (!args){
  return; 
} 

//Init Command
if (args[0] === '--init') {
  File.Init();
  return;
} else {
  [filename, blade] = args;
} 

//If only filename is passed as argument
if (!blade) { 
  (async () => {
    try {
      const filepath = await File.GetFilePath(filename)
    
      if (filepath) {
        const fileContent = await File.ReadFile(filepath);
        
        CLIMessages.Success(filename);
        console.log(fileContent);
      } else {
        return;
      }
    } catch (error) {
      CLIMessages.Error();
      console.error(`Error processing file: ${filename}\n${error.message}`);
    }
  })();
}

//If filename and @blade are passed as arguments
else if (blade) {
  (async() => {
    try{
      const filepath = await File.GetFilePath(filename)
    
      if (filepath) {
        const fileContent = await File.ReadFile(filepath);
        const bladeContent = File.GetBladeContent(fileContent, blade);
        
        if (bladeContent) {
          CLIMessages.Success(filename, blade);
          console.log(bladeContent);
        } else {
          return; 
        }
      } else {
        return;
      }
    } catch (error) {
      CLIMessages.Error();
      console.error(`Error processing file: ${filename}\n${error.message}`);
    }
  })();
}