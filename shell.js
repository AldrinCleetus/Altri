import rLine from 'readline'
import os from 'os'
import { fork, execFile, exec, spawn, execSync } from 'child_process';


const cmd = rLine.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: os.homedir() + '>'
  });



process.chdir(os.homedir())


cmd.prompt()

const cd = /cd /i
const pwd = /pwd/i
const ls = /ls /i
const javascript = /.*\.js$/i


// On return key press

cmd.on('line',(input)=>{
    cmd.setPrompt(process.cwd() + '>')
    
    // cd somewhere
    if(input.match(cd)){

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
            
            process.chdir(input.split(' ')[1])
            cmd.setPrompt(process.cwd() + '>')
            cmd.prompt()

          })
       

    }
    
    if(input.match(pwd)){
       console.log(process.cwd())
       cmd.prompt()
    }

    if(input.match(ls)){
        const child = exec('dir '+ input.split(' ')[1], (error, stdout, stderr) => {
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

    // Running javascript just from file:path

    if(input.match(javascript)){
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


        // const nodeFile = spawn('node',[input],{
        //   detached: false,
        // })

        // nodeFile.stdout.on('data',data=>{
        //   console.log(data.toString())
        // })

        // nodeFile.stdout.on('close',code=>{
        //   console.log(nodeFile.pid)
        //   console.log("closed")
        //   cmd.prompt()
        // })
        
    }

    cmd.prompt()
    

})



