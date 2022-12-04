# Altri

To run:

```console
$ node shell.js
```

## Supported Commands: 

Lists all the files in the working directory

```console
$> ls 
```

Prints the current working directory

```console
$> pwd 
```

Executes the binary with arguments

```console
$> <path_to_binary> <args> 
```

Example: 

```console
$> bash testBashScript.sh 
```
```console
$> node test.js
```

Sends the process matching the id from background to foreground

```console
$> fg <process_id>
```

## Supported Key Events

CTRL + Z : Sends the active process to background (Only works in Linux currently)

CTRL + C : Kills the active program