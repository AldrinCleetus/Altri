const changeDirectory = (newDirectory)=>{

    let currentDirectory =  process.chdir(newDirectory) + ">"

    return currentDirectory 
}

export { changeDirectory }