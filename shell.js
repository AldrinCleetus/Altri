import rLine from 'readline'

const cmd = rLine.createInterface(process.stdin,process.stdout)


cmd.question(`Whats you age ${process.argv} \n`, (input)=>{
    process.stdout.write("Hello \n")
    cmd.close()
})

cmd.on('close',()=>{
    console.log("Closing cmd")
})