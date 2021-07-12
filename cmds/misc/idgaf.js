  
const Commando = require('discord.js-commando')

module.exports = class AddCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'idgaf',
      group: 'misc',
      memberName: 'idgaf',
      description: 'Picks content for you',
      argsType: 'multiple',
    })
  }



  async run(message, args) {


    const Content = ['Roaming', 'Outposts', 'Transports', 'Fame Farming', 'Roads Roaming']
    const roam = ['Fort Flagged', 'Lym Flagged', 'Thet Flagged', 'Mart Flagged', 'Bridge Flagged', 'Caer Flagged', 'Red Flagged', 'Blackzone']
    const Citys = ['Fort', 'Lym', 'Thet', 'Mart', 'Bridge', 'Caer']
    const From = ['From Royals', 'From Blackzone']
    

    const pickingContent = Math.floor(Math.random() * Content.length)
    const randomCity = Math.floor(Math.random() * Citys.length);
    const roaming = Math.floor(Math.random() * roam.length);
    const start = Math.floor(Math.random() * From.length);
    let activity = ''

    switch(pickingContent) {
      case 0:
        activity = `${Content[pickingContent]} ${roam[roaming]}`
        break;
      case 1:
        activity = `${Citys[randomCity]} ${Content[pickingContent]}`
        break;
      case 2:
        activity = `${Citys[randomCity]} ${Content[pickingContent]}`
        break;
      case 3:
        activity = `${Content[pickingContent]} ${roam[roaming]}`
        break;
      case 4:
        activity = `${Content[pickingContent]} starting ${From[start]}`
        break;
    }

    const Discord = require('discord.js')
    const Embed = new Discord.MessageEmbed()
    .setFooter("OverLooked", message.guild.iconURL())
    .setTitle(`**${activity}**`)
    .setColor(`GREEN`)
    .setTimestamp()

    message.channel.send(Embed)
  }
}