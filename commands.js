import { exec, spawn } from 'child_process';

const isWindows = process.platform === 'win32'
const processRunning = []

const executeBinary = (cmd,input)=>{

  const commands = input.split(' ') 
  
  if(commands[1]== undefined){
    cmd.prompt()
    return
  }

  const pathToBinary = commands[0]
  commands.shift()


  const child = spawn(pathToBinary,commands)

  processRunning.push({
    processId: child.pid,
    processRef: child
  })



  child.stdout.on("data", async data=>{
      console.log(data.toString())
  })

  child.stderr.on('data',(data)=>{
    console.log(data.toString())
  })

  child.on('close', (code)=>{
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

const setForeground = (cmd,input)=>{

  const id = input.split(' ')[1]
  console.log(id)

  const objectFromId = processRunning.find(object => {
    object.processId === id 
    return object
  })

  objectFromId.processRef.kill('SIGCONT')


}

export { changeDirectory,presentWorkingDirectory,listAllFiles, setForeground, executeBinary, processRunning }

