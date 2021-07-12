const Commando = require('discord.js-commando')
const Discord = require('discord.js');
module.exports = class AddCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'random',
      group: 'misc',
      memberName: 'random',
      description: 'Random number Generator',
      argsType: 'multiple',
    })
  }



  async run(message, args) {
    if((!parseInt(args[0])))
    {
        message.reply('Please provide a valid number!')
        return
    }
    RunCommand()

    async function RunCommand()
    {
      const number = Math.floor(Math.random() * args[0]) + 1

      const numberEmbed = new Discord.MessageEmbed()
      .setFooter("OverLooked", message.guild.iconURL())
      .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true, format: `png` }))
      .setColor(`GREEN`)
      .setTitle(`Result: ${number}`)
      .setTimestamp()

      message.channel.send(numberEmbed)
    }
  }
}