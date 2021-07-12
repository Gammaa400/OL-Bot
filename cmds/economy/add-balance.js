const Commando = require('discord.js-commando')
const Log = require('../../logHandler')
const Discord = require('discord.js')
const mongo = require('../../mongo')
const economy = require('../../economy')

module.exports = class AddCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'addbal',
      group: 'economy',
      memberName: 'addbal',
      description: 'Adds numbers together',
      argsType: 'multiple',
    })
  }



  async run(message, args) {
    let Owner = false
    let HasRequiredPerms = false
    let RequiredRole = ['Banker']
    let client = this.client
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
        RunCommand(client)
    } else {
       message.reply(`You need one of the following  ***${RequiredRole}*** role(s)!`)
       return
    }
   

    async function RunCommand()
    {

      if(isNaN(args[0])) 
      {
        console.log(args[0])
      }

    }
  }
}

/*
const mention = message.mentions.users.first()
const coins = args[0]
if (isNaN(coins)) {
  message.reply('Please provide a valid number of coins.')
  return
}

const userId = args[1].slice(3, -1)
const name = guild.members.cache.get(userId).nickname || client.users.cache.get(userId).username
const guildId = message.guild.id
const newCoins = await economy.addCoins(name, guildId, userId, coins)

const BalEmbed = new Discord.MessageEmbed()
.setAuthor(mention.tag, mention.displayAvatarURL({ dynamic: true, format: `png` }))
.setColor(`GREEN`)
.setFooter("OverLooked", message.guild.iconURL())
.setTitle(`${name}'s balance has been updated!`)
.addFields(
    { name: 'Added', value: `$` + new Intl.NumberFormat().format(coins), inline: true  },
    { name: 'Balance', value: `$` + new Intl.NumberFormat().format(newCoins), inline: true },)
.setTimestamp()

message.channel.send(BalEmbed);
Log.addLog(name, coins, userId, guildId, message)
mongo().then(async (mongoose) => {mongoose.connection.close()})
*/