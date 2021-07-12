const economy = require('../../economy')
const Commando = require('discord.js-commando')

module.exports = class AddCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'total',
      group: 'economy',
      memberName: 'total',
      description: 'Gets total economy balance.',
      argsType: 'multiple',
    })
  }



  async run(message, args) {


    RunCommand()

    async function RunCommand()
    {
      const Total = await economy.getTotal()
      const Discord = require('discord.js');
  
  
      const TotalEmbed = new Discord.MessageEmbed()
      .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true, format: `png` }))
      .setColor(`GREEN`)
      .setTitle(`Total Economy Cash`)
      .setDescription(`$` + new Intl.NumberFormat().format(Total))
      .setTimestamp()
  
      message.channel.send(TotalEmbed)
    }
  }
}