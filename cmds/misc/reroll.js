const Commando = require('discord.js-commando')

module.exports = class AddCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'reroll',
      group: 'misc',
      memberName: 'reroll',
      description: '',
      argsType: 'multiple',
    })
  }



  async run(message, args) {
    const ms = require("ms");
    let client = this.client

    RunCommand()

    async function RunCommand()
    {

      // If no message ID or giveaway name is specified
      if(!args[0]){
          return message.channel.send(':x: You have to specify a valid message ID!');
      }

      // try to found the giveaway with prize then with ID
      let giveaway = 
      // Search with giveaway prize
      client.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ') && g.guildID === message.guild.id) ||
      // Search with giveaway ID
      client.giveawaysManager.giveaways.find((g) => g.messageID === args[0] && g.guildID === message.guild.id);

      // If no giveaway was found
      if(!giveaway){
        return message.channel.send('Unable to find a giveaway for `'+ args.join(' ') +'`.');
      }

      // Reroll the giveaway
      client.giveawaysManager.reroll(giveaway.messageID)
      .then(() => {
          // Success message
          message.channel.send('Giveaway rerolled!');
      })
      .catch((e) => {
          if(e.startsWith(`Giveaway with message ID ${giveaway.messageID} is not ended.`)){
              message.channel.send('This giveaway is not ended!');
          } else {
              console.error(e);
              message.channel.send('An error occured...');
          }
      });

    }
  }
}