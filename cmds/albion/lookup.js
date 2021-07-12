// module.exports = {
//     commands: 'lookup',
//     minArgs: 1,
//     maxArgs: 1,
//     expectedArgs: '<Person(Cap Sensitive)>',
//     description: "Gets the albion stats from requested player(Cap Sensitive on name)",
//     callback: async(message, arguments, text) => 
//     {
//       const axios = require('axios');
//       message.channel.send('Please be patient it may take some time to load!')
//       const Name = arguments[0]
//       const Discord = require('discord.js')
//         axios.get('https://gameinfo.albiononline.com/api/gameinfo/search?q='+ arguments[0])
//         .then(async function (res) {
//           const IdGrab = res.data.players[0].Id
          
//           test(IdGrab)
//         })
//         .catch(function (error) {
//           message.reply('An error occured')
//           console.log(error);
//         })





//         async function test(IdGrab)
//         {

//           const test = IdGrab
//           axios.get(`https://gameinfo.albiononline.com/api/gameinfo/players/${test}`)
//           .then(async function (res) {
//             const deathFame = new Intl.NumberFormat().format(res.data.DeathFame)
//             const KillFame = new Intl.NumberFormat().format(res.data.KillFame)
//             const FameRatio = new Intl.NumberFormat().format(res.data.FameRatio)
//             const Total = new Intl.NumberFormat().format(res.data.LifetimeStatistics.PvE.Total)
//             const Royal = new Intl.NumberFormat().format(res.data.LifetimeStatistics.PvE.Royal)
//             const Outlands = new Intl.NumberFormat().format(res.data.LifetimeStatistics.PvE.Outlands)
//             const Avalon = new Intl.NumberFormat().format(res.data.LifetimeStatistics.PvE.Avalon)
//             const Hellgate = new Intl.NumberFormat().format(res.data.LifetimeStatistics.PvE.Hellgate)
//             const CorruptedDungeon = new Intl.NumberFormat().format(res.data.LifetimeStatistics.PvE.CorruptedDungeon)
//             const CraftingTotal = new Intl.NumberFormat().format(res.data.LifetimeStatistics.Crafting.Total)

//             const infoGrab = new Discord.MessageEmbed()
//             .setFooter("OverLooked", message.guild.iconURL())
//             .setTitle(`${Name}'s Fame`)
//             .setColor(`RANDOM`)
//             .setTimestamp()


//             infoGrab.addFields(
//               { name: 'DeathFame', value: deathFame, inline: true },
//               { name: 'KillFame', value: KillFame, inline: true },
//               { name: 'FameRatio', value: FameRatio, inline: true },
//               { name: 'TotalPve', value: Total, inline: true },
//               { name: 'RoyalPvE', value: Royal, inline: true },
//               { name: 'OutlandsPvE', value: Outlands, inline: true },
//               { name: 'AvalonPvE', value: Avalon, inline: true },
//               { name: 'HellgatePvE', value: Hellgate, inline: true },
//               { name: 'CorruptedDungeonPvE', value: CorruptedDungeon, inline: true },
//               { name: 'CraftingTotal', value: CraftingTotal, inline: true },
//             )
//             //message.channel.send([`DeathFame: ${deathFame}`, `KillFame: ${KillFame}`, `FameRatio: ${FameRatio}`])
//             //message.channel.send([ 'TotalPvE: ' + Total ,'Royal: ' + Royal, 'Outlands: ' + Outlands, 'Avalon: ' + Avalon, 'Hellgate: ' + Hellgate, 'CorruptedDungeon: ' + CorruptedDungeon, 'Crafting Total: ' + CraftingTotal])
//             message.channel.send(infoGrab)
//           })
//           .catch(function (error) {
//             message.reply('An error occured')
//             console.log(error);
//           })
//         }


//     },

//   }
    
const Commando = require('discord.js-commando')

module.exports = class AddCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'lookup',
      group: 'albion',
      memberName: 'lookup',
      description: 'Looks up requested players albion stats',
      argsType: 'single',
    })
  }



  async run(message, args) {
    const Name = args
    const Discord = require('discord.js')
    const axios = require('axios');

   RunCommand(args)

    function RunCommand(args)
    {
      message.channel.send('Please be patient it may take some time to load!')
        axios.get('https://gameinfo.albiononline.com/api/gameinfo/search?q='+ args)
        .then(async function (res) {
          const IdGrab = res.data.players[0].Id
          test(IdGrab)
        })
        .catch(function (error) {
          message.reply('An error occured')
          console.log(error);
        })
    }

    async function test(IdGrab)
    {

      const test = IdGrab
      axios.get(`https://gameinfo.albiononline.com/api/gameinfo/players/${test}`)
      .then(async function (res) {

        const deathFame = new Intl.NumberFormat().format(res.data.DeathFame)
        const KillFame = new Intl.NumberFormat().format(res.data.KillFame)
        const FameRatio = new Intl.NumberFormat().format(res.data.FameRatio)
        const Total = new Intl.NumberFormat().format(res.data.LifetimeStatistics.PvE.Total)
        const Royal = new Intl.NumberFormat().format(res.data.LifetimeStatistics.PvE.Royal)
        const Outlands = new Intl.NumberFormat().format(res.data.LifetimeStatistics.PvE.Outlands)
        const Avalon = new Intl.NumberFormat().format(res.data.LifetimeStatistics.PvE.Avalon)
        const Hellgate = new Intl.NumberFormat().format(res.data.LifetimeStatistics.PvE.Hellgate)
        const CorruptedDungeon = new Intl.NumberFormat().format(res.data.LifetimeStatistics.PvE.CorruptedDungeon)
        const CraftingTotal = new Intl.NumberFormat().format(res.data.LifetimeStatistics.Crafting.Total)

        const infoGrab = new Discord.MessageEmbed()
        .setFooter("OverLooked", message.guild.iconURL())
        .setTitle(`${Name}'s Fame`)
        .setColor(`RANDOM`)
        .setTimestamp()


        infoGrab.addFields(
          { name: 'DeathFame', value: deathFame, inline: true },
          { name: 'KillFame', value: KillFame, inline: true },
          { name: 'FameRatio', value: FameRatio, inline: true },
          { name: 'TotalPve', value: Total, inline: true },
          { name: 'RoyalPvE', value: Royal, inline: true },
          { name: 'OutlandsPvE', value: Outlands, inline: true },
          { name: 'AvalonPvE', value: Avalon, inline: true },
          { name: 'HellgatePvE', value: Hellgate, inline: true },
          { name: 'CorruptedDungeonPvE', value: CorruptedDungeon, inline: true },
          { name: 'CraftingTotal', value: CraftingTotal, inline: true },
        )
        //message.channel.send([`DeathFame: ${deathFame}`, `KillFame: ${KillFame}`, `FameRatio: ${FameRatio}`])
        //message.channel.send([ 'TotalPvE: ' + Total ,'Royal: ' + Royal, 'Outlands: ' + Outlands, 'Avalon: ' + Avalon, 'Hellgate: ' + Hellgate, 'CorruptedDungeon: ' + CorruptedDungeon, 'Crafting Total: ' + CraftingTotal])
        message.channel.send(infoGrab)
      })
      .catch(function (error) {
        message.reply('An error occured')
        console.log(error);
      })
    }
  }
}