const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./secure/configs/main.json");
const { createConnection } = require("mysql");
const fs = require('fs')

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
const commandFiles = fs
    .readdirSync('./commands')
    .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
  
    client.commands.set(command.name, command);
  
    if (typeof command.aliases !== "undefined") {
      for (var i = 0; i < command.aliases.length; i++) {
        client.commands.set(command.aliases[i], command);
      }
    }
  }
  client.on("message", async (message) => {
    if (message.author.bot) return;
    if (message.content.indexOf(config.bot.prefix) !== 0) return;
    const args = message.content
      .slice(config.bot.prefix.length)
      .trim()
      .split(/ +/g);
    const command = args.shift().toLowerCase();
  
    if (!client.commands.has(command)) return;
  
    try {
      client.commands.get(command).execute(client, message, args, con);
    } catch (error) {
      console.error(error);
      message.reply("An error occurred");
    }
  });

let con = createConnection(config.mysql);

con.connect((err) => {
  if (err) throw err;

  console.log(config.mysql, `- ${config.mysql.database} kører & er klar.`);
});

client.login(config.bot.token);