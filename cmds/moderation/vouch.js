// module.exports = {
//   commands: 'vouch',
//   permissionError: `You need permissions`,
//   expectedArgs: "<@person>",
//   minArgs: 1,
//   maxArgs: 1,
//   description: "Auto assigns roles for guild members, ally's, or friends",
//   callback: async(message, arguments, text) => 
//   {
//     const Discord = require('discord.js')
//     const role1 = message.guild.roles.cache.find((r) => r.name === "Alliance");
//     const role2 = message.guild.roles.cache.find((r) => r.name === "Albion");
//     const role3 = message.guild.roles.cache.find((r) => r.name === "Overlooked");
//     const role4 = message.guild.roles.cache.find((r) => r.name === "Pending Recruit");
//     const role5 = message.guild.roles.cache.find((r) => r.name === "Friendzone");
//     const filter = m => m.author.id ===  message.author.id
//     const requestedPerson = message.guild.member(message.mentions.users.first())
//     const personsUsername = message.mentions.users.first().username


//     const vouchEmbed = new Discord.MessageEmbed()
//     .setFooter("OverLooked", message.guild.iconURL())
//     .setTitle(`Would you like to give ${personsUsername} the roles for guild, ally, or friend?`)
//     .setColor(`GREEN`)
//     .setTimestamp()

//     var Msg = await message.channel.send(vouchEmbed);
//     message.channel.awaitMessages(filter, {
//       max: 1,
//       time: 10000,
//          }).then(async(collected) => {
//           if(collected.first().content.toLowerCase() == 'guild'){
//             guild()
//       } 
//       if(collected.first().content.toLowerCase() == 'ally'){
//         ally()
//     } 
//     if(collected.first().content.toLowerCase() == 'friend'){
//       friend()
//   } 
//       }).catch(() => {
//         Msg.edit(vouchEmbed.setDescription(`<@${message.author.id}> You took too long!`))

//         })


//       function guild()
//       {
//         requestedPerson.roles.add(role3).catch(console.error);
//         requestedPerson.roles.remove(role4).catch(console.error);
//         Msg.edit(vouchEmbed.setDescription(`**${requestedPerson} have successfully been given the roles for guildmembers!**`))
//       }
//       function ally()
//       {
//         requestedPerson.roles.add(role1).catch(console.error);
//         requestedPerson.roles.remove(role4).catch(console.error);
//         Msg.edit(vouchEmbed.setDescription(`**${requestedPerson} have successfully been given the roles for ally members!**`))
//       }
//       function friend()
//       {
//         requestedPerson.roles.add(role5).catch(console.error);
//         requestedPerson.roles.remove(role4).catch(console.error);
//         Msg.edit(vouchEmbed.setDescription(`**${requestedPerson} have successfully been given the roles for friends!**`))
//       }





//   },
//   requiredRoles: ['Guild Officer'],
// }

  
const Commando = require('discord.js-commando')

module.exports = class AddCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'vouch',
      group: 'moderation',
      memberName: 'vouch',
      description: 'Gives roles',
      argsType: 'multiple',
    })
  }



  async run(message, args) {
    const Discord = require('discord.js')
    const role1 = message.guild.roles.cache.find((r) => r.name === "Alliance");
    const role2 = message.guild.roles.cache.find((r) => r.name === "Albion");
    const role3 = message.guild.roles.cache.find((r) => r.name === "Overlooked");
    const role4 = message.guild.roles.cache.find((r) => r.name === "Pending Recruit");
    const role5 = message.guild.roles.cache.find((r) => r.name === "Friendzone");
    const filter = m => m.author.id ===  message.author.id
    const requestedPerson = message.guild.member(message.mentions.users.first())
    const personsUsername = message.mentions.users.first().username
    const vouchEmbed = new Discord.MessageEmbed()
    .setFooter("OverLooked", message.guild.iconURL())
    .setTitle(`Would you like to give ${personsUsername} the roles for guild, ally, or friend?`)
    .setColor(`GREEN`)
    .setTimestamp()

    var Msg = await message.channel.send(vouchEmbed);

    let Owner = false
    let HasRequiredPerms = false
    let RequiredRole = ['Guild Officer']

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
      message.channel.awaitMessages(filter, {
        max: 1,
        time: 10000,
           }).then(async(collected) => {
            if(collected.first().content.toLowerCase() == 'guild'){
              guild()
        } 
        if(collected.first().content.toLowerCase() == 'ally'){
          ally()
      } 
      if(collected.first().content.toLowerCase() == 'friend'){
        friend()
    } 
        }).catch(() => {
          Msg.edit(vouchEmbed.setDescription(`<@${message.author.id}> You took too long!`))
  
          })
    }


    function guild()
    {
      requestedPerson.roles.add(role3).catch(console.error);
      requestedPerson.roles.remove(role4).catch(console.error);
      Msg.edit(vouchEmbed.setDescription(`**${requestedPerson} have successfully been given the roles for guildmembers!**`))
    }
    function ally()
    {
      requestedPerson.roles.add(role1).catch(console.error);
      requestedPerson.roles.remove(role4).catch(console.error);
      Msg.edit(vouchEmbed.setDescription(`**${requestedPerson} have successfully been given the roles for ally members!**`))
    }
    function friend()
    {
      requestedPerson.roles.add(role5).catch(console.error);
      requestedPerson.roles.remove(role4).catch(console.error);
      Msg.edit(vouchEmbed.setDescription(`**${requestedPerson} have successfully been given the roles for friends!**`))
    }
  }
}