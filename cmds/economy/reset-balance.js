const Commando = require('discord.js-commando')

module.exports = class AddCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'resetbalance',
      aliases: ['resetbalance', 'resetbal', 'reset'],
      group: 'economy',
      memberName: 'resetbalance',
      description: 'Resets balance of author or up to 25 @s balances',
      argsType: 'multiple',
    })
  }



  async run(message, args) {
    const Log = require('../../logHandler.js')
    const delay = ms => new Promise(res => setTimeout(res, ms));
    const Discord = require('discord.js')
    const mongo = require('../../mongo')
    const economy = require('../../economy')
    const guildId = message.guild.id   
    const filter = m => m.author.id ===  message.author.id
    let client = this.client
    const { guild, channel } = message

    RunCommand()

    async function RunCommand()
    {


        if(args[0] && message.member.roles.cache.some((r) => r.name === "Banker") && args[0].toLowerCase() !== 'bal')
        {
          message.channel.send(`Are you sure you want to reset these balances? Yes/No`)
          message.channel.awaitMessages(filter, {
            max: 1,
            time: 10000,
               }).then(async(collected) => {
                if(collected.first().content.toLowerCase() == 'yes' && message.member.roles.cache.some((r) => r.name === "Banker")){
                resetMulti()
            } 
            if(collected.first().content.toLowerCase() == 'no' && message.member.roles.cache.some((r) => r.name === "Banker")){
              message.reply('The command has been cancelled!')
          } 
            }).catch(() => {
            message.reply('You took too long!') 
            })
        }else if(args[0] && !message.member.roles.cache.some((r) => r.name === "Banker"))
        {
          message.reply('You do not have permission to reset others balances!') 
        }

        if(!args[0])
        {
          message.channel.send(`Are you sure you want to reset your balance? Yes/No`)
          message.channel.awaitMessages(filter, {
            max: 1,
            time: 10000,
               }).then(async(collected) => {
                if(collected.first().content.toLowerCase() == 'yes'){
                  resetSingle()
            } 
            if(collected.first().content.toLowerCase() == 'no'){
              message.reply('The command has been cancelled!')
          } 
            }).catch(() => {
            message.reply('You took too long!') 
            })
        }
    }


    async function resetSingle(message, delay)
    {
      try{
        const userId = message.author.id
        const name = guild.members.cache.get(userId).nickname || target.username
        var coins = 0
        const oldBalance = await economy.getCoins(name, guildId, userId)
        const confirm = await economy.resetCoins(name, guildId, userId, coins)

        const resetsingleEmbed = new Discord.MessageEmbed()
        .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true, format: `png` }))
        .setTitle(`Your balance has been reset! Previous balance: $` + new Intl.NumberFormat().format(oldBalance))
        .setColor(`GREEN`)
        .setFooter("OverLooked", message.guild.iconURL())
        .setTimestamp()

        message.channel.send(resetsingleEmbed)

        await delay(5000);
        console.log('Connection closed!')
        mongo().then(async (mongoose) => {mongoose.connection.close()})
        Log.resetLog(name, message, confirm, oldBalance)
      }
      catch(err)
      {
        console.log(err)
        message.reply('An error occured')
      }
    }

    async function resetMulti()
    {
      const resetEmbed = new Discord.MessageEmbed()
      .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true, format: `png` }))
      .setTitle(`Balances that have been reset:`)
      .setColor(`GREEN`)
      .setFooter("OverLooked", message.guild.iconURL())
      .setTimestamp()

      let NameList = [];
      let BalanceList = [];
      let ErrorList = [];
  
      for (let i = 0; i < args.length; i++) {
        try{
          var coins = 0
          const userId = args[i].slice(3, -1)
          const name = guild.members.cache.get(userId).nickname || client.users.cache.get(userId).username
          const oldBalance = await economy.getCoins(name, guildId, userId)
          const confirm = await economy.resetCoins(name, guildId, userId, coins)

          //Pushing Name & Balance to array to be added to Embed
          NameList.push(`${name}\n`)
          BalanceList.push(`Previous: $${new Intl.NumberFormat().format(oldBalance)}\n`); 
          Log.addLog(name, coins, userId, guildId, message)
          if(oldBalance != confirm){message.channel.send(`<@163396331585536010> Error when reseting ${name}'s balance!`)}
        }
        catch
        {
          ErrorList.push(` ${args[i]}`);
        }
      }
      resetEmbed.addFields({ name: `Name`, value: `${NameList.join(" ")}`, inline: true})
      resetEmbed.addFields({ name: `Balance`, value: `${BalanceList.join(" ")}`, inline: true})

      if(ErrorList.length != 0)message.reply(`Attempted but failed to add money to the following Users.${ErrorList}`)
      message.channel.send(resetEmbed);
      return
    }
    await delay(10000);
    mongo().then(async (mongoose) => {mongoose.connection.close()})
  }
}

/*
array.forEach(async(args) => 
{
  try{
    const userId = args.slice(3, -1)
    const name = guild.members.cache.get(userId).nickname || target.username
    var coins = 0
    const oldBalance = await economy.getCoins(name, guildId, userId)
    const confirm = await economy.resetCoins(name, guildId, userId, coins)
    resetEmbed.addFields({ name: name, value: `Previous Balance: $` + new Intl.NumberFormat().format(oldBalance)})

    Log.resetLog(name, message, confirm, oldBalance)
  }
  catch(err)
  {
    console.log(err)
    message.reply('An error occured')
  }
})
*/