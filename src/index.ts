#!/usr/bin/env node

import { createBot } from 'mineflayer';
import { pathfinder, Movements, goals} from 'mineflayer-pathfinder'

class Bot {
    constructor(host : string, email : string, password : string, master : string, prefix : string = "!") {

        var bot = createBot({
            host: host, 
            username: email, 
            password: password,
            version: "1.16.5"
        })

        const mcData = require('minecraft-data')(bot.version)
        const defaultMove = new Movements(bot, mcData)
          
        const RANGE_GOAL = 1 // get within this radius of the player
          
        bot.loadPlugin(pathfinder)

        bot.on('chat', (username, message) => {
            if (username === bot.username) return
            if(master != null && username != master) return
            if(!message.startsWith(prefix)) return

            let command = message.split(prefix)[1].split(" ")

            console.log(`${username} issued command: ${command}`)         
        
            switch (command[0].toLowerCase()) {
                case 'stop': {
                    bot.pathfinder.stop()
                }
                case 'follow': {
                    followPlayer(username)
                }
                case 'come': {
                    comeToPlayer(username)
                }
            }
            
            
        })
    
        function followPlayer(player : string) {
            
            const target = bot.players[player]?.entity

            if (!target) {
                bot.chat("I don't see you !")
                return
            }

            bot.pathfinder.setMovements(defaultMove)
            bot.pathfinder.setGoal(new goals.GoalFollow(target, 1000))
        }

        function comeToPlayer(player : string) {

            const target = bot.players[player]?.entity

            if (!target) {
                bot.chat("I don't see you !")
                return
            }

            const { x: playerX, y: playerY, z: playerZ } = target.position
            bot.pathfinder.setMovements(defaultMove)
            bot.pathfinder.setGoal(new goals.GoalNear(playerX, playerY, playerZ, RANGE_GOAL))
        }
    }
}

const yargs = require("yargs");

const options = yargs
 .usage("Usage: -h <server> -e <email> -p <password>")
 .option("host", { alias: "h", describe: "IP or domain of the server", type: "string", demandOption: true })
 .option("email", { alias: ["name","e"], describe: "Email of your minecraft account", type: "string", demandOption: true })
 .option("p", { alias: ["password","pw"], describe: "Your password (only online server)", type: "string", demandOption: false })
 .option("m", { alias: "master", describe: "If definded bot will only execute command of the master", type: "string", demandOption: false })
 .option("prefix", { alias: "", describe: "Set the prefix of ingame command (Default: '!')", type: "string", demandOption: false })
 .argv;

 new Bot(options.host, options.email, options.password, options.master, options.prefix);