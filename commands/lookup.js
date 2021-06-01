const { MessageEmbed } = require('discord.js');
const config = require('../secure/configs/main.json');

module.exports = {
    name: 'lookup',
    description: 'Template!',
    async execute(client, message, args, con) {
    var id = args[0];
    if (!message.member.roles.cache.find((r) => r.id === "823882801115693086"))
      return;
    // con.query("SELECT identifier, sex, license FROM users", function (err, result, fields) {
    const query = con.query(
      `SELECT * FROM users WHERE identifier = '${id}'`,
      function Lookup(err, result) {
    if (result) {
        if (err) return message.channel.send(err);
        // if (!args[0]) return message.channel.send("Giv mig et SteamID");
        /*      "Person informationer"       */
        let firstname = result[0].firstname;
        let sex = result[0].sex;
        let lastname = result[0].lastname;
        let job = result[0].job;
        let job_grade = result[0].job_grade;
        let phone_number = result[0].phone_number;
        let dob = result[0].dateofbirth;
        /*                "Penge"               */
        let bank = result[0].bank;
        let money = result[0].money;
        /*             "Identifiers"            */
        let steamID = result[0].identifier;
        let license = result[0].license;
        let steamName = result[0].name;
        /*            "Andet"          */
        let permisionLevel = result[0].permission_level;
        let isDead = result[0].is_dead;
        let group = result[0].group;

        const lookupEmbed = new MessageEmbed()
          .setColor("RANDOM")
          .addFields(
            {
              name: "Person informationer",
              value: `**Navn**:\n ${firstname} ${lastname}\n **Fødselsdato:**\n ${dob}\n **Job:**\n ${job}\n **Job Grade**:\n ${job_grade}\n **Køn**:\n${sex}\n **Nummer**:\n ${phone_number}\n `,
              inline: true,
            },
            {
              name: "Penge",
              value: `**Bank**:\n${bank}\n**Kontanter**:\n${money}`,
              inline: true,
            },
            {
              name: "Identifiers",
              value: `**SteamID**:\n ${steamID}\n **Steam Navn**:\n ${steamName}\n**FiveM License**:\n${license}`,
              inline: true,
            },
            {
              name: "Andet",
              value: `**Tilstand**:\n __${isDead}__ - (0 = i live, 1 = død)\n **Permissions Level**:\n ${permisionLevel}\n **Group**:\n${group}`,
              inline: true,
            }
          )
          .setFooter(
            `requested by: ${message.author.tag} || ${message.author.id}`
          );
        message.channel.send(lookupEmbed);
          } else {
              message.reply('Hvaa, ser ud til der skete en fejl. Måske prøv at stik mig et steamID.')
          }
      }
    );
    return;
    },
};