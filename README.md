# mcBot-cli

mcBot-cli is a lightweight command line tool for creating [mineflayer clients](https://github.com/PrismarineJS/mineflayer/) (Minecraft client without any Monjang code) used for  stress/-testing

## Usage

### run

run `mcbot-cli -h <Sevrer ip> --name <name>` to create a offline bot

use `mcbot-cli -h <Sevrer ip> -e <email> -p <password>` to run the bot on a online server

add `-m <yourusername>` to set the master so that bot online executes your commands

use `--prefix <prefix>` to set a command prefix (Default: "!")

### ingame

if your type `come` in the chat, the bot will come to your location

if your use `follow` the bot will follow your around

## Installation

1. install [node 16](https://nodejs.org/) for your operating system
2. clone the repo `git clone https://github.com/NeverStopGaming/mcBot-cli.git`
3. navigate in to the repo `cd mcBot-cli` 
4. run `npm install` or `yarn install` to install the dependency
5. type `npm run build` or `yarn build` to finaly install the cli

## TODO

- [ ] docker support
- [ ] multi instances
- [ ] add more minecraft versions
- [ ] overview ui
- [X] command pefix
- [ ] add more commands
