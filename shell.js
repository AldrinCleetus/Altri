import rLine from 'readline'
import os from 'os'
import { fork, execFile, exec, spawn } from 'child_process';
import { changeDirectory } from './commands.js';


const cmd = rLine.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: os.homedir() + '>'
  });


cmd.prompt()

let regex = /cd /i;
// On return key press

cmd.on('line',(input)=>{
    cmd.setPrompt(process.cwd() + '>')
    cmd.prompt()
    
    // cd somewhere
    if(input.match(regex)){

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

    // Running javascript just from file:path

    // if(input.endsWith('.js')){
    //     const child = exec('node ' + input, (error, stdout, stderr) => {
    //         if (error) {
    //           console.log(error)
    //         }

    //         if(stderr){
    //             console.log(stderr)
    //         }

    //         console.log(stdout);

    //       })
    // }

})



