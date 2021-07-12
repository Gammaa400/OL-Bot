const Canvas = require('canvas')
const { MessageAttachment } = require('discord.js')
const path = require('path') 
const Commando = require('discord.js-commando')

module.exports = class AddCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'misskris',
      aliases: ['misskris',  'kris'],
      group: 'misc',
      memberName: 'misskris',
      description: '',
      argsType: 'multiple',
    })
  }



  async run(message, args) {

    let Owner = false

    let client = this.client

    //Checks if user is Owner
    for(var i = 0; i < this.client.owners.length; i++){
      const { id } = this.client.owners[i]
      if(message.author.id == id){
        Owner = true
      }
     }
     if(message.author.id != '230732478229250048' && Owner != true)
     {
       message.channel.send('You need to be the prettiest flower to use this command!')
       return
     }else if(Owner = false)
     {
      message.channel.send('You need to be the prettiest flower to use this command!')
      return
     }else
     {
      RunCommand()
     }

    async function RunCommand()
    {

  
      const attachment = new MessageAttachment('Misskriss.gif')
      message.channel.send('', attachment)
    }
  }
}