  
const Commando = require('discord.js-commando')

module.exports = class AddCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'cleanup',
      group: 'economy',
      memberName: 'cleanup',
      description: 'Cycles through DB.',
      argsType: 'multiple',
    })
  }



  async run(message, args) {
    let Owner = false
    const Log = require('../../logHandler')
    const economy = require('../../economy')
    const Discord = require('discord.js');
    let client = this.client
    const mongo = require('../../mongo')
    //Checks if user is Owner
    for(var i = 0; i < this.client.owners.length; i++){
      const { id } = this.client.owners[i]
      if(message.author.id == id){
        Owner = true
      }
     }

     if(Owner == true)
     {
      RunCommand()
     }


    async function RunCommand()
    {
      const Log = require('../../logHandler.js')
      const test = await economy.DBLoop()
      const length = test.length
      const guildId = message.guild.id
      const delay = ms => new Promise(res => setTimeout(res, ms));
      message.channel.send(`Attempting to Clean the DB. If nothing else shows up the DB is clean!`)

      for (let counter = 0; counter < length; ++counter)
      {
        

        let {name, coins, userId} = test[counter]
        let TotalCoins = coins
        let InGuild = false

        const mutualGuilds = client.guilds.cache.filter((guild) => {

          if(guild.members.cache.has(userId))return InGuild = true
       });
       if(InGuild == false)
       {
         coins = 0


        economy.DeleteOne(userId)
        message.channel.send(`${name} Has been removed. Bal($${new Intl.NumberFormat().format(TotalCoins)}), ID(${userId})`)
       }
      }
      await delay(10000);
      mongo().then(async (mongoose) => {mongoose.connection.close()})
    }
  }
}