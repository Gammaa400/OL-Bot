const { Mongoose } = require('mongoose')
const economy = require('../../economy')
const Commando = require('discord.js-commando')
const Log = require('../../logHandler')
const mongo = require('../../mongo')
const Discord = require('discord.js')

module.exports = class AddCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'addbulk',
      aliases: ['addbulk',  'bulk'],
      group: 'economy',
      memberName: 'addbulk',
      description: 'Increases balance of up to 25 people by stated amount.',
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
      const Role = RequiredRole[i]
      if(message.member.roles.cache.some(role => role.name === `${Role}`))
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
      let coins = args[0]
      if (isNaN(coins)) 
      {
        message.reply('Please provide a valid numnber of coins.')
        return
      }

      const guildId = message.guild.id
      const Embed = new Discord.MessageEmbed()
      .setFooter("OverLooked", message.guild.iconURL())
      .setTitle(`$`+ new Intl.NumberFormat().format(coins) + ` Has be added to:`)
      .setColor(`GREEN`)
      .setTimestamp()
      var NameList = [];
      var BalanceList = [];
      var ErrorList = [];

      for (i = 1; i < args.length; i++) {
        try{

          const userId = args[i].slice(3, -1)
          const name = guild.members.cache.get(userId).nickname || client.users.cache.get(userId).username
          const newCoins = await economy.addCoins(name, guildId, userId, coins)
          Log.addLog(name, coins, userId, guildId, message)
          
          //Pushing Name & Balance to array to be added to Embed
          NameList.push(`${name}\n`);
          BalanceList.push(`$${new Intl.NumberFormat().format(newCoins)}\n`); 

        }
        catch
        {
          ErrorList.push(` ${args[i]}`);
        }
      }

      Embed.addFields({ name: `Name`, value: `${NameList.join(" ")}`, inline: true})
      Embed.addFields({ name: `Balance`, value: `${BalanceList.join(" ")}`, inline: true})
      message.channel.send(Embed);
      if(ErrorList.length != 0)message.reply(`Attempted but failed to add money to the following Users.${ErrorList}`)

      mongo().then(async (mongoose) => {mongoose.connection.close()})
    }
  }
}