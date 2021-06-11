const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs')
const config = require("../secure/configs/main.json");
console.log('læst: 1')
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
console.log('læst: 2')
const commandFiles = fs
    .readdirSync('./commands')
    .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(`../commands/${file}`);
  
    client.commands.set(command.name, command);
  
    if (typeof command.aliases !== "undefined") {
      for (var i = 0; i < command.aliases.length; i++) {
        client.commands.set(command.aliases[i], command);
      }
    }
  }
  console.log('læst: 3')
client.on("message", async (message) => {
    console.log('læst: 4')
    if (message.author.bot) return;
    if (message.content.indexOf(config.bot.prefix) !== 0) return;
    const args = message.content
      .slice(config.bot.prefix.length)
      .trim()
      .split(/ +/g);
    const command = args.shift().toLowerCase();
    console.log('læst: 5')
    if (!client.commands.has(command)) return;
  
    try {
      client.commands.get(command).execute(client, message, args, con);
      console.log('læst: 6')
    } catch (error) {
      console.error(error);
      message.reply("An error occurred");
    }
  });
