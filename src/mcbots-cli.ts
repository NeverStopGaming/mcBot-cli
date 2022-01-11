#!/usr/bin/env node
const { spawn } = require('child_process');
const yargs = require('yargs')
var fs = require('fs');

const options = yargs
 .usage("Usage: -h <host>")
 .option("host", { alias: "h", describe: "IP or domain of the server", type: "string", demandOption: true })
 .option("amount", { alias: "a", describe: "The amount of bots", type: "string", demandOption: true })
 .option("usernamelist", { alias: "cl", describe: "List of username for the bots (offline)", type: "string", demandOption: false })
 .option("accountlist", { alias: "al", describe: "List of username and password for the bots format: username:password (online)", type: "string", demandOption: false })
 .argv;

 let usernames : Array<string> = []
 let passwords : Array<string> = []

 if(options.accountlist != null){

    var s =  fs.readFileSync(options.accountlist, 'utf8');

    s.split("\n").forEach(element => {
       usernames.push(element.split(":")[0])
       passwords.push(element.split(":")[1])
    });


 }else {
    for(let i = 0; i < options.amount; i++){
        usernames.push("Bot_" + i)
    }
 }

 const ls = spawn(`mcbot-cli -h ${options.host} -e ${usernames[0]} -p ${passwords[0]}`);

 ls.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });
  
  ls.on('close', (code) => {
    console.log(`child process close all stdio with code ${code}`);
  });
  
  ls.on('exit', (code) => {
    console.log(`child process exited with code ${code}`);
  });