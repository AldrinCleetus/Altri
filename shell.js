import rLine from 'readline'
import os from 'os'
import { changeDirectory,setForeground, executeBinary, listAllFiles, presentWorkingDirectory , processRunning} from './commands.js';



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
  bash: /.*\.sh$/i,
  fg: /fg [0-9]/i,
  exit: /exit/i
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
      case commands.fg.test(input):
        setForeground(cmd,input)
        break
      case commands.exit.test(input):
        cmd.pause()
        break
      default:
        cmd.prompt()
        break
    }

})

// Ctrl + Z
cmd.on('SIGTSTP',()=>{

  // Get the latest running process and adds to the background
  const lastProcess = processRunning.slice(-1)[0]
  lastProcess.processRef.kill('SIGTSTP')
  console.log(lastProcess.processId)
  cmd.prompt()
  
})

// Ctrl + C
cmd.on('SIGINT', () => {
  const lastProcess = processRunning.slice(-1)[0]

  if(lastProcess === undefined){
    return
  }
  // Kill the process
  lastProcess.processRef.kill('SIGTERM')
  // Remove it from the process list
  processRunning.pop()
  cmd.prompt()
})



