import { fork, execFile, exec, spawn, execSync } from 'child_process';

const changeDirectory = (cmd,input)=>{

    console.log(input)
    const child = exec(input, (error, stdout, stderr) => {
  
      if (error) {
          console.log(error)
          cmd.prompt()
          return
      }
  
      if(stderr){
          console.log(stderr)
          cmd.prompt()
          return
      }
      
      try {
        process.chdir(input.split(' ')[1])
      } catch (error) {
        console.log(error)
      }
      cmd.setPrompt(process.cwd() + '>')
      cmd.prompt()
  
    })
  }


const presentWorkingDirectory = (cmd,input)=>{
    console.log(process.cwd())
    cmd.prompt()
}

const listAllFiles = (cmd,input)=>{

    let lsCommand = 'dir'

    if(!input.split(' ')[1] === undefined){
        lsCommand = 'dir '+ input.split(' ')[1]
    }

    const child = exec(lsCommand, (error, stdout, stderr) => {
        if (error) {
            console.log(error)
            cmd.prompt()
          return
        }

        if(stderr){
            console.log(stderr)
            cmd.prompt()
            return
        }

        console.log(stdout)
        cmd.prompt()

      })
}

const runNodejs = (cmd,input)=>{
    const child = exec('node '+ input, (error, stdout, stderr) => {
        if (error) {
          console.log(error)
        }

        if(stderr){
            console.log(stderr)
        }

        console.log(stdout);
        console.log(child.pid)
        cmd.prompt()
      })
}
  export { changeDirectory,presentWorkingDirectory,listAllFiles, runNodejs }