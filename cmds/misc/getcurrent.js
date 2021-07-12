const { Client, Collection, MessageEmbed } = require("discord.js");
const Commando = require('discord.js-commando')

module.exports = class AddCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'getcurrent',
      group: 'misc',
      memberName: 'getcurrent',
      description: 'Gets current UTC time',
      argsType: 'single',
    })
  }



  async run(message, args) {
    const Discord = require('discord.js');
    const today2 = new Date();
    var hours2 = today2.getUTCHours();
    var minutes2 = today2.getUTCMinutes();
    var seconds2 = today2.getUTCSeconds();

    if(hours2 < 10)
    {
      hours2 = '0' + hours2;
    }
    if(minutes2 < 10)
    {
      minutes2 = '0' + minutes2;
    }
    if(seconds2 < 10)
    {
      seconds2 = '0' + seconds2;
    }
    


    const Time = new Discord.MessageEmbed()
    .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true, format: `png` }))
    .setColor(`RANDOM`)
    .setTitle(`It is ${hours2}:${minutes2} UTC`)
    .setTimestamp()
    
    message.channel.send(Time);
  }
}