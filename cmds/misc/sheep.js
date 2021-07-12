const Canvas = require('canvas')
const { MessageAttachment } = require('discord.js')
const path = require('path') 
const Commando = require('discord.js-commando')

module.exports = class AddCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'sheep',
      group: 'misc',
      memberName: 'sheep',
      description: 'Adds numbers together',
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
     if(message.author.id != '336221791045419009' && Owner != true)
     {
       message.channel.send('You need to be a sheep to use this command!')
       return
     }else if(Owner = false)
     {
      message.channel.send('You need to be a sheep to use this command!')
      return
     }else
     {
      RunCommand()
     }

    async function RunCommand()
    {
      const picture = Math.floor(Math.random() * 10) + 1
      const canvas = Canvas.createCanvas(850, 350)
      const ctx = canvas.getContext('2d')
      
      const background = await Canvas.loadImage(
        path.join(__dirname, `../../SheepPictures/${picture}.png`)
      )
      let x = 0
      let y = 0
      ctx.drawImage(background, x, y)
  
  
  
  
      const attachment = new MessageAttachment(canvas.toBuffer())
      message.channel.send('', attachment)
    }
  }
}