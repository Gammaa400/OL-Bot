const Commando = require('discord.js-commando')

module.exports = class SimJoinCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'simjoin',
      group: 'moderation',
      memberName: 'simjoin',
      userPermissions: ['ADMINISTRATOR'],
      description: 'Simulates a join',
    })
  }

  async run (message) {
    this.client.emit('guildMemberAdd', message.member)
  }
}