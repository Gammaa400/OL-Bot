const economy = require('../../economy')
const Commando = require('discord.js-commando')

module.exports = class AddCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'removebalance',
      aliases: ['removebalance', 'removebal'],
      group: 'economy',
      memberName: 'removebalance',
      description: 'Remove requested amount from players balance.',
      argsType: 'multiple',
    })
  }



  async run(message, args) {
    const Discord = require('discord.js')
    let Owner = false
    let HasRequiredPerms = false
    let RequiredRole = ['Banker']
    let client = this.client
    const mention = message.mentions.users.first()
    const mongo = require('../../mongo')
    const Log = require('../../logHandler.js')
    const { guild, channel } = message

    //Checks if user is Owner
    for(var i = 0; i < this.client.owners.length; i++){
      const { id } = this.client.owners[i]
      if(message.author.id == id){
        Owner = true
      }
     }

    //Checks if user has required role
    for(var i = 0; i < RequiredRole.length; i++){
      const test = RequiredRole[i]
      if(message.member.roles.cache.some(role => role.name === `${test}`))
      {
        HasRequiredPerms = true
      }
     }
     //Runs command if user has premissions
    if (message.member.roles.cache.some(role => role.name === `${RequiredRole}`) || HasRequiredPerms == true || Owner == true) {
        RunCommand()
    } else {
       message.reply(`You need one of the following  ***${RequiredRole}*** role(s)!`)
    }
   

    async function RunCommand()
    {
      if (!mention) {
        message.reply('Please tag a user to add coins to.')
        return
      }
  
      const coins = args[0]
      if (isNaN(coins)) {
        message.reply('Please provide a valid number of coins.')
        return
      }
  
      const userId = args[1].slice(3, -1)
      const name = guild.members.cache.get(userId).nickname || target.username
      const guildId = message.guild.id
      const removedCoins = -coins
  
      const newCoins = await economy.addCoins(name, guildId, userId, removedCoins)
  
      const BalEmbed = new Discord.MessageEmbed()
      .setAuthor(mention.tag, mention.displayAvatarURL({ dynamic: true, format: `png` }))
      .setColor(`Green`)
      .setFooter("OverLooked", message.guild.iconURL())
      .setTitle(`${name}'s balance has been updated!`)
      .addFields(
        { name: 'Removed', value: `$` + new Intl.NumberFormat().format(coins), inline: true  },
        { name: 'Balance', value: `$` + new Intl.NumberFormat().format(newCoins), inline: true },
  )
      .setTimestamp()
      Log.removeLog(name, coins, message, newCoins)
  
      message.channel.send(BalEmbed);
      mongo().then(async (mongoose) => {mongoose.connection.close()})
    }
  }
}