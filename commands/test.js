const { MessageEmbed } = require('discord.js');
const config = require('../secure/configs/main.json');

module.exports = {
    name: 'test',
    description: 'Template!',
    async execute(client, message, args, con) {
    
    message.reply('123')
    }
};