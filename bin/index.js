#! /usr/bin/env node

const utils = require('./utils.js')

// Receive the argvs
const args = process.argv.slice(2, 4);

// Validate argvs 
if (utils.ArgvValidator(args)) {
  // Continue with the code
} else { 
  return;
};

const filename = args[0];
const blade = args[1];

// If only filename is passed as arg 
if (filename && !blade) {
  utils.GetFilePath(filename)
    .then(async path => { 
      if (path != null) {
        const data = await utils.ReadFile(path); 
        utils.WriteCliMessage(1, filename);
        console.log(data);
      } else {
        return; 
      }
    })
    .catch(error => console.error('Error:', error.message));
}

// If filename and @blade is passed as arg 
else if (filename && blade) {
  utils.GetFilePath(filename)
    .then(async path => {
      const data = await utils.ReadFile(path); 
      let regex = new RegExp(blade + '[^@]*', 'g');
      let match = data.match(regex);
      if (match && match.length > 0) {
        let result = match[0].replace(blade, '').trim();
        utils.WriteCliMessage(1, filename, blade);
        console.log(result);
      } else {
        utils.WriteCliMessage(2);
        console.log('Error: Blade not found');
      }       
    })  
    .catch(error => {
      utils.WriteCliMessage(2);
      console.error('Error:', error.message);
    });
}