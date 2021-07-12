  const Commando = require('discord.js-commando')

  module.exports = class AddCommand extends Commando.Command {
    constructor(client) {
      super(client, {
        name: 'pingmember',
        group: 'misc',
        memberName: 'pingmember',
        description: 'spam :D (<amount> <@people> <message>)',
        argsType: 'multiple',
      })
    }
  
  
  
    async run(message, args) {
      let Owner = false
      let HasRequiredPerms = false
      let RequiredRole = ['Guild Officer']
      let client = this.client
  
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
        const Amount = args[0]
        const Person = args[1]
        const Pingmessage = args.slice(2).join(' ')
        if(Amount > 25)
        {
          message.reply('Are you crazy? The limit is 25 nerd!')
          return
        }
  
        try{
          let Pinged = 0
          while(Pinged < Amount)
          {
            message.channel.send(Person + ' ' + Pingmessage)
            Pinged++
          }
    }
    catch(err)
    {
      console.log(err)
      message.reply('An error occured')
    }
      }
    }
  }