const CLIMessages = require('./cli-messages.js') 

function Argv (args) {
  // Check if at least one argument is provided
  if (args.length < 1) {
    CLIMessages.Error();
    console.log('Error: Missing required argument: filename');
    console.log('Usage: cdscribe <filename> <@blade>');

    return false;
  } else if (args.length > 1) {
    let blade = args[1];
     
    //verify if blade starts with @
    if (blade.substring(0,1) !== '@') {
      CLIMessages.Error();
      console.log('Error: Blade should start with @')
      console.log('Usage: cdscribe <filename> <@blade>');

      return false; 
    }
    
    return args; 
  }

  return args;
}

 
module.exports = { Argv }  
