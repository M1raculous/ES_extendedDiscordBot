const { MessageEmbed } = require("discord.js");
const config = require("../secure/configs/main.json");

module.exports = {
  name: "bm",
  description: "Template!",
  async execute(client, message, args, con) {
    if (!message.member.roles.cache.find((r) => r.id === "823882801115693086"))
      return;

    let id = args[0];

    var query = con.query(
      `SELECT * FROM user_accounts WHERE identifier = '${id}'`,
      (err, result) => {
        if (err) return console.error(err);
        let blackMoneyAmount = result[0].money;
        let getID = result[0].id;

        message.channel.send(`${getID} Har ${blackMoneyAmount} sorte penge.`);
      }
    );
  },
};
