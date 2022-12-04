import { exec, spawn } from 'child_process';

const isWindows = process.platform === 'win32'


const runBashScript = (cmd,input)=>{
  const child = exec('bash '+ input, (error, stdout, stderr) => {
    if (error) {
      console.log(error)
    }

    if(stderr){
        console.log(stderr)
    }

    console.log(stdout);
    cmd.prompt()
  })
}

const changeDirectory = (cmd,input)=>{

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
  
    let lsCommand = input
    
    if(isWindows){

      lsCommand = 'dir'

      if(!input.split(' ')[1] === undefined){
          lsCommand = 'dir '+ input.split(' ')[1]
      }
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

    const nodeCommands = input.split(' ') 

    if(nodeCommands[1]== undefined){
      cmd.prompt()
      return
    }

    const child = spawn(nodeCommands[0],[nodeCommands[1]])

    child.stdout.on("data", async data=>{
       console.log(data.toString())
    })

    child.on('close', (code)=>{
      cmd.prompt()
    })

}
  export { changeDirectory,presentWorkingDirectory,listAllFiles, runNodejs, runBashScript }