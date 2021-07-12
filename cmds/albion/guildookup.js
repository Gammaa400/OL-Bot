const Commando = require('discord.js-commando')

module.exports = class AddCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'guildlookup',
      group: 'albion',
      memberName: 'guildlookup',
      description: 'Looks up requested guild albion stats',
      argsType: 'single',
    })
  }

  async run(message, args) {
    const Discord = require('discord.js')
    const axios = require('axios');
    const filter = m => m.author.id ===  message.author.id

    const Embed = new Discord.MessageEmbed()
    .setFooter("OverLooked", message.guild.iconURL())
    .setTitle('Please say the guild you want to lookup. This is case sensitive and if the guild name has a space in it use a + as the space!\n__**May take some time to load!**__')
    .setColor(`RANDOM`)
    .setTimestamp()
    var Msg = await message.channel.send(Embed)

    message.channel.awaitMessages(filter, {
      max: 1,
      time: 25000,
         }).then(async(collected) => {
           const guildname = collected.first().content
           IdGrabFunction(guildname)
      }).catch(() => {
      message.reply('You took too long!') 
      })

    async function IdGrabFunction(guildname)
    {
         axios.get('https://gameinfo.albiononline.com/api/gameinfo/search?q='+ guildname)
        .then(async function (res) {
          const IdGrab = res.data.guilds[0].Id
          InfoGrabFunction(IdGrab)
        })

  }
  async function InfoGrabFunction(IdGrab)
  {
    axios.get('https://gameinfo.albiononline.com/api/gameinfo/guilds/' + IdGrab + '/data')
    .then(async function (res) {
      const Name = res.data.guild.Name
      const FounderName = res.data.guild.FounderName
      const AllianceTag = res.data.guild.AllianceTag
      const Members = res.data.basic.memberCount
      const KillFame = new Intl.NumberFormat().format(res.data.guild.killFame)
      const DeathFame = new Intl.NumberFormat().format(res.data.guild.DeathFame)
      Msg.edit(Embed.setTitle(`Here is the infomation for the guild **${Name}**!`))
      Msg.edit(Embed.addFields(
        { name: 'FounderName', value: FounderName, inline: true },
        { name: 'AllianceTag', value: AllianceTag, inline: true },
        { name: 'MemberCount', value: Members, inline: true },
        { name: 'KillFame', value: KillFame, inline: true },
        { name: 'DeathFame', value: DeathFame, inline: true },
      ))
    })
  }
  }
}

