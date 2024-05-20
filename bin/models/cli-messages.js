function Init(){
  console.log(`\x1b[35m-- CDSCRIBE | Init Success --\x1b[0m`);
}

function Success(filename, blade){
  if (filename && !blade) {
      console.log(`\x1b[35m-- CDSCRIBE | ${filename} --\x1b[0m`);
    } else if (filename && blade) {
      console.log(`\x1b[35m-- CDSCRIBE | ${filename} | ${blade} --\x1b[0m`);
    }
}

function Error(){
  console.log(`-- CDSCRIBE | Error --`);
}

module.exports = { Init, Success, Error }
