const { MessageEmbed } = require('discord.js');
const config = require('../secure/configs/main.json');

module.exports = {
    name: 'plate',
    description: 'Template!',
    async execute(client, message, args, con) {
        if (!message.member.roles.cache.find((r) => r.id === "823882801115693086"))
      return;

    let id = args[0];
    // if(typeof error === 'undefined') return console.log('an error occured!')
    var query = con.query(
      `SELECT * FROM owned_vehicles WHERE owner = '${id}'`,
      function GetPlates(err, result, fields, row) {
        if (err) return console.error(err);
        if (typeof err === "undefined") throw err;
        if (result) {
        const vehicleInformation = new MessageEmbed()
        vehicleInformation.setColor('RANDOM')
        for (var i = 0; i < result.length; i++) {
          var n = i + 1;
          // console.log(n + " plate: " + result[i]["plate"]);

        vehicleInformation.addFields(
          {
            name: `Information om køretøj ${n}`,
            value: "**Nummerplade**\n " + result[i]["plate"] + "\n **Type**\n " + result[i]["type"],
            inline: true,
          }
          )
        }
        vehicleInformation.setFooter(`requested by: ${message.author.tag} || ${message.author.id}`)
        vehicleInformation.setTimestamp()
        message.channel.send(vehicleInformation)
        // console.log(results)
        // console.log(result[1].plate)
        // console.log(result[i]['plate'])
        } else {
            message.channe.send('Du glemte vist noget, hva!?')
        }
      }
    );
    
    }
};