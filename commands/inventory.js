const { MessageEmbed } = require("discord.js");
const config = require("../secure/configs/main.json");

module.exports = {
  name: "inventory",
  description: "Template!",
  async execute(client, message, args, con) {
    if (!message.member.roles.cache.find((r) => r.id === config.permissions.inventory))
      return message.reply("Det ulovligheder!")

    let id = args[0];
    // if(typeof error === 'undefined') return console.log('an error occured!')
    var query = con.query(
      `SELECT * FROM truck_inventory WHERE plate = '${id}'`,
      function GetPlates(err, result, fields, row) {
        if (err) return console.error(err);
        if (typeof err === "undefined") throw err;
        if (result) {
          const inventoryEmbed = new MessageEmbed();
          inventoryEmbed.setColor("#1874ed");
          for (var i = 0; i < result.length; i++) {
            var n = i + 1;

            inventoryEmbed.addFields({
              name: `Informatiom om ${result[i]["plate"]} #${n}`,
              value:
                "\n **Item**\n " +
                result[i]["item"] +
                "\n **Item Navn**\n " +
                result[i]["name"] +
                "\n **Count** \n" + 
                result[i]["count"],
              inline: true,
            });
          }
          inventoryEmbed.setFooter(
            `requested by: ${message.author.tag} || ${message.author.id}`
          );
          inventoryEmbed.setTimestamp();
          message.channel.send(inventoryEmbed);
          // console.log(result[i]['ID'])
        } else {
          message.channe.send("Du glemte vist noget, hva!?");
        }
      }

    );
  },
};