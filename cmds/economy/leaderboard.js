const economy = require('../../economy')
const Commando = require('discord.js-commando')

module.exports = class AddCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'leaderboard',
      aliases: ['leaderboard',  'lb'],
      group: 'economy',
      memberName: 'leaderboard',
      description: 'Gets economy leaderboard',
      argsType: 'multiple',
    })
  }



  async run(message, args) {
    RunCommand()

    async function RunCommand()
    {
      let limit = 10
      if(args.length > 0)
      {
        limit = args[0] * 10
      }
      let test = await economy.getLB(limit)
      message.channel.send(test)
    }
  }
}