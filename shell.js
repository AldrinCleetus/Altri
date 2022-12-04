import rLine from 'readline'
import os from 'os'
import { changeDirectory, executeBinary, listAllFiles, presentWorkingDirectory , test} from './commands.js';



const cmd = rLine.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: os.homedir() + '>'
  });


// Default working directory to user's home directory
process.chdir(os.homedir())
cmd.prompt()


const commands = {
  cd: /cd /i,
  pwd : /pwd/i,
  ls : /ls/i,
  javascript : /.*\.js$/i,
  bash: /.*\.sh$/i
}

// On return key press

cmd.on('line',(input)=>{
    cmd.setPrompt(process.cwd() + '>')


    switch (true) {
      case commands.cd.test(input):
        changeDirectory(cmd,input)
        break
      case commands.pwd.test(input):
        presentWorkingDirectory(cmd,input)
        break
      case commands.ls.test(input):
        listAllFiles(cmd,input)
        break
      case commands.javascript.test(input):
        executeBinary(cmd,input)
        break
      case commands.bash.test(input):
        executeBinary(cmd,input)
        break
      default:
        cmd.prompt()
        break
    }

})

cmd.on('SIGTSTP', () => {
  console.log('Caught SIGTSTP.');
})


