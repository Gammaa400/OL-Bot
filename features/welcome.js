const Canvas = require('canvas')
const { MessageAttachment } = require('discord.js')
const path = require('path')
const { getChannelId } = require('../cmds/moderation/setwelcome')

module.exports = async (client) => {
  const joinchannelId = '709447716085956621'  //'709447716085956621' // welcome channel
  const logchannelId = '709466288564600942'  //'709447716085956621' // welcome channel

  const targetChannelId = '738423282096799814' // rules and info
  client.on('guildMemberAdd', async (member) => {
    const { guild } = member

    const channelId = await getChannelId(guild.id)
    if (!channelId) {
      return
    }

    const channel = guild.channels.cache.get(channelId)
    if (!channel) {
      return
    }

    const canvas = Canvas.createCanvas(850, 350)
    const ctx = canvas.getContext('2d')

    const background = await Canvas.loadImage(
      path.join(__dirname, '../background3.png')
    )
    let x = 0
    let y = 0
    ctx.drawImage(background, x, y)

    const pfp = await Canvas.loadImage(
      member.user.displayAvatarURL({
        format: 'png',
      })
    )
    x = canvas.width / 2 - pfp.width / 2
    y = 25
    ctx.drawImage(pfp, 97, 107, 129, 125,)

    ctx.fillStyle = '#ffffff'
    ctx.font = 'bold 45px sans-serif'
    let text = `Welcome ${member.user.tag}`
    x = canvas.width / 2 - ctx.measureText(text).width / 2
    ctx.fillText(text, 180, 330 , 550)


    const attachment = new MessageAttachment(canvas.toBuffer())
    channel.send('', attachment)

    const Discord = require('discord.js')
    const channel2 = member.guild.channels.cache.get(logchannelId)

    const join2 = new Discord.MessageEmbed()
    .setDescription(String(`${member.displayName} Has joined the server their id is (${member.id}).`))
    .setColor(`GREEN`)
    .setTimestamp()
    channel2.send(join2)
  })

  client.on("guildMemberRemove", (member) => {
    const channel2 = member.guild.channels.cache.get(logchannelId)
    const message2 = `${member.displayName} Has left the server their id (${member.id}).`
    const Discord = require('discord.js')
    const test = new Discord.MessageEmbed()
    .setDescription(String(`${member.displayName} Has left the server their id (${member.id}).`))
    .setColor(`RED`)
    .setTimestamp()
    channel2.send(test)

  });
}













// module.exports = (client) => {
//   const joinchannelId = '709447716085956621'  //'709447716085956621' // welcome channel
//   const logchannelId = '709466288564600942'  //'709447716085956621' // welcome channel

//   const targetChannelId = '738423282096799814' // rules and info

//   client.on('guildMemberAdd', async(member) => {
//     const memberId = member.user.id
//     console.log(memberId)
//     const messageJoin = `Hello <@${memberId}>, Welcome to Overlooked. If you are here to apply please see the ${member.guild.channels.cache.get(targetChannelId).toString()} channel.`

//     const channel = member.guild.channels.cache.get(joinchannelId)
//     const channel2 = member.guild.channels.cache.get(logchannelId)

//     const Discord = require('discord.js')

//     const join2 = new Discord.MessageEmbed()
//     .setDescription(String(`${member.displayName} Has joined the server their id is (${member.id}).`))
//     .setColor(`GREEN`)
//     .setTimestamp()

//     channel.send(messageJoin)
//     channel2.send(join2)
//   })

//   client.on("guildMemberRemove", (member) => {
//     const channel2 = member.guild.channels.cache.get(logchannelId)
//     const message2 = `${member.displayName} Has left the server their id (${member.id}).`
//     const Discord = require('discord.js')
//     const test = new Discord.MessageEmbed()
//     .setDescription(String(`${member.displayName} Has left the server their id (${member.id}).`))
//     .setColor(`RED`)
//     .setTimestamp()
//     channel2.send(test)

//   });
// }