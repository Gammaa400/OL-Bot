const Commando = require('discord.js-commando')
const economy = require('../../economy')
const Discord = require('discord.js')
const mongo = require('../../mongo')
const Canvas = require('canvas')
const { MessageAttachment } = require('discord.js')
const path = require('path')

module.exports = class AddCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'bal',
      group: 'economy',
      memberName: 'bal',
      description: 'Check persons balance',
      argsType: 'single',
    })
  }



  async run(message, args) {
    const guild = message.guild
    const target = message.mentions.users.first() || message.author
    const userId = target.id
    const name = guild.members.cache.get(userId).nickname || target.username
    const guildId = message.guild.id

    const coins = await economy.getCoins(name, guildId, userId)

    const BalEmbed = new Discord.MessageEmbed()
    .setAuthor(target.tag, target.displayAvatarURL({ dynamic: true, format: `png` }))
    .setColor(`BLUE`)
    .setFooter("OverLooked", message.guild.iconURL())
    .setDescription(`$` + new Intl.NumberFormat().format(coins))
    .setTimestamp()



    if(target == message.author)
    {
      BalEmbed.setTitle(`Your Balance is:`)
    }
    else if(target == message.mentions.users.first())
    {
      BalEmbed.setTitle(`${target.username}'s Balance is:`)
    }



    //Draws Background
    const canvas = Canvas.createCanvas(850, 450)
    const ctx = canvas.getContext('2d')
    const background = await Canvas.loadImage(
      path.join(__dirname, '../../Loot_Bal4.png')
    )
    let x = 0
    let y = 0
    ctx.drawImage(background, x, y)

    //Profile picture
    const pfp = await Canvas.loadImage(
      target.displayAvatarURL({
        format: 'png',
      })
    )
    x = canvas.width / 2 - pfp.width / 2
    y = 25
    ctx.drawImage(pfp, 12, 12, 162, 162,)

    //Text?
    ctx.fillStyle = '#ffffff'
    ctx.font = 'bold 45px sans-serif'

    let NameText = `${name}`
    let BalText = `$${new Intl.NumberFormat().format(coins)}`
    let Balance = `Balance`
    let Rank = `Rank: #`

    ctx.fillText(NameText, 8, 225 , 550)
    ctx.fillText(Rank   , 8, 300 , 350)

    ctx.font = 'bold 65px sans-serif'
    ctx.fillText(Balance, 382, 75 , 550)
    ctx.textAlign = "center"
    ctx.fillText(BalText, 500, 175 , 650)

    //Send attachment
    const attachment = new MessageAttachment(canvas.toBuffer())
    message.channel.send('', attachment)

    mongo().then(async (mongoose) => {mongoose.connection.close()})
    //message.channel.send(BalEmbed);
  }
}