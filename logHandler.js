
    // Add Log

      async function addLog(name, coins, userId, guildId, message)
    {

      const economy = require('./economy.js')
      const mongo = require('./mongo')
      const logchannelId = '793638946755313665'
      const delay = ms => new Promise(res => setTimeout(res, ms));
      const Discord = require('discord.js')
      const channel = message.guild.channels.cache.get(logchannelId)
      const confirm = await economy.getCoins(name, guildId, userId)
    
    const test = new Discord.MessageEmbed()
    .setFooter("OverLooked", message.guild.iconURL())
    .setTitle(`${name} Has had $` + new Intl.NumberFormat().format(coins) + ` added. Their new total $${new Intl.NumberFormat().format(confirm)}`)
    .setColor(`GREEN`)
    .setTimestamp()
    channel.send(test)
    
    return
    }

    // Remove Log
    
    async function removeLog(name, coins, message, newCoins)
    {

      try{
        const logchannelId = '793638946755313665'
        const Discord = require('discord.js')
        const channel = message.guild.channels.cache.get(logchannelId)

    
        const test = new Discord.MessageEmbed()
        .setFooter("OverLooked", message.guild.iconURL())
        .setTitle(`${name} Has had $` + new Intl.NumberFormat().format(coins) + ` removed. Their new total $${new Intl.NumberFormat().format(newCoins)}`)
        .setColor(`GREEN`)
        .setTimestamp()
        channel.send(test)
      }
      catch(err)
      {
        message.reply('Log Error')
        console.log(err)
      }
    }
    
    // Reset Log

  async function resetLog(name, message, confirm, oldBalance)
  {
    
    try{
    const logchannelId = '793638946755313665'
    const Discord = require('discord.js')
    const channel = message.guild.channels.cache.get(logchannelId)
  
    if(confirm == 0)
    {
      confirmResult = `Yes`
    }
    else
    {
      confirmResult = `No`
      channel.send(`<@163396331585536010> Error when reseting ${name}'s balance!`)
    }

  const test = new Discord.MessageEmbed()
  .setFooter("OverLooked", message.guild.iconURL())
  .setTitle(`${name} Balance has been reset. Previous Balance: $` + new Intl.NumberFormat().format(oldBalance))
  .setColor(`GREEN`)
  .setTimestamp()
  channel.send(test)
    }
    catch(err)
    {
      message.reply('Log Error')
      console.log(err)
    }
  }
  module.exports = { resetLog, removeLog, addLog };