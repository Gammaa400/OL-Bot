const Commando = require('discord.js-commando')

module.exports = class AddCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'giveaway',
      group: 'misc',
      memberName: 'giveaway',
      description: '<#channel> <time> <Winners> <Prize>',
      argsType: 'multiple',
    })
  }



  async run(message, args) {
    const ms = require("ms");
    let client = this.client

    RunCommand()

    async function RunCommand()
    {

      let giveawayDuration = args[0]
    
      if(!giveawayDuration || isNaN(ms(giveawayDuration))) return message.channel.send('Please provide a valid duration!')
    
      let giveawayWinners = args[1]
    
      if(isNaN(giveawayWinners) || (parseInt(giveawayWinners) <= 0)) return message.channel.send('Please provide a valid number of winners!')
    
      let giveawayPrize = args.slice(2).join(" ")
    
      if(!giveawayPrize) return message.channel.send('Do you want me to giveaway nothing?')
    
      
      client.giveawaysManager.start(message.channel, {
        time: ms(giveawayDuration),
        prize: giveawayPrize,
        winnerCount: parseInt(giveawayWinners),
        hostedBy: client.config.hostedBy ? message.author : null,
    
        messages: {
          giveaway: (client.config.everyoneMention ? "@everyone\n\n" : "")+"🎉🎉 **GIVEAWAY** 🎉🎉",
          giveawayEnded: (client.config.everyoneMention ? "@everyone\n\n" : "")+"🎉🎉 **GIVEAWAY ENDED** 🎉🎉",
          timeRemaining: "Time remaining: **{duration}**",
          inviteToParticipate: "React with 🎉 to enter",
          winMessage: "Congrats {winners}, you won **{prize}**",
          embedFooter: "Giveaway time!",
          noWinner: "Couldn't determine a winner",
          hostedBy: "Hosted by {user}",
          winners: "winner(s)",
          endedAt: "Ends at",
          units: {
            seconds: "seconds",
            minutes: "minutes",
            hours: "hours",
            days: "days",
            pluralS: false
          }
        }
      })
    }
  }
}