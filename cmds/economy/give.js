const Commando = require('discord.js-commando')
const Log = require('../../logHandler')
const economy = require('../../economy')
const Discord = require('discord.js');    
const mongo = require('../../mongo')
module.exports = class AddCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'give',
      group: 'economy',
      memberName: 'give',
      description: 'Gives money to another person.',
      argsType: 'multiple',
    })
  }



  async run(message, args) {
    let client = this.client
    const { guild, channel } = message
    const target = message.mentions.users.first()
    const guildId = message.guild.id
    const userId = target.id
    const name = guild.members.cache.get(userId).nickname || client.users.cache.get(userId).username
    const Author = guild.members.cache.get(message.author.id).nickname || client.users.cache.get(message.author.id).username
    const coins = await economy.getCoins(name, guildId, userId)


  
    if (!target) {
      message.reply('Please specify someone you want to give money to!')
      return
    }

    const coinsToGive = args[1]
    if (isNaN(coinsToGive)) {
      message.reply('Please provide a valid number to give.')
      return
    }
    if (coinsToGive < 0) {
      message.reply('Please provide a positive number!')
      return
    }

    const coinsOwned = await economy.getCoins(Author, guildId, message.author.id)
    if (coinsOwned < coinsToGive) {
      message.reply(`You do not have $${coinsToGive}!`)
      return
    }

    const remainingCoins = await economy.addCoins(
      message.author.username,
      guildId,
      message.author.id,
      coinsToGive * -1
    )

    const newBalance = await economy.addCoins(name, guildId, userId, coinsToGive)

    const BalEmbed = new Discord.MessageEmbed()
    .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true, format: `png` }))
    .setColor(`GREEN`)
    .setTitle(`You have given ${name} $` + new Intl.NumberFormat().format(coinsToGive) + `!`)
	.addFields(
        { name: 'Your Balance', value: `$` + new Intl.NumberFormat().format(remainingCoins), inline: true  },
        { name: 'Their Balance', value: `$` + new Intl.NumberFormat().format(newBalance), inline: true },
	)
    .setTimestamp()
    Log.addLog(name, coinsToGive, userId, guildId, message)
    Log.removeLog(Author, coinsToGive, message, remainingCoins)
    mongo().then(async (mongoose) => {mongoose.connection.close()})
    message.channel.send(BalEmbed);
  }
}