const { MessageEmbed, Message } = require("discord.js");
const config = require("../secure/configs/main.json");

module.exports = {
  name: "parkings",
  description: "Template!",
  async execute(client, message, args, con) {
    let id = args[0];

    const query = con.query(
      `SELECT * FROM user_parkings WHERE identifier = '${id}'`,
      function getParkings(err, result) {
        if (result) {
          const parkingsEmbed = new MessageEmbed()
          parkingsEmbed.setColor("#1874ed");
          for (var i = 0; i < result.length; i++) {
            var n = i + 1;
  
            // console.log(result[i]["id"] || 'No id found!')
            parkingsEmbed.addFields(
            {
              name: "Parking Zone #" + n,
              value: `**ID:**\n ${result[i]["id"]}\n**Garage:**\n  ${result[i]["garage"]}\n **Zone**\n ${result[i]["zone"]} `,
              inline: true,
            }
            )
          }
          parkingsEmbed.setTimestamp();
          message.channel.send(parkingsEmbed);
        }
      }
    );
  },
};
