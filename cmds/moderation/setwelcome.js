const welcomeSchema = require('../../schemas/welcome-schema')
const Commando = require('discord.js-commando')
const cache = new Map()
const mongo = require('../../mongo')

const loadData = async () => {
  const results = await welcomeSchema.find()

  for (const result of results) {
    cache.set(result._id, result.channelId)
  }
}
loadData()

module.exports = class SetWelcomeCommand extends Commando.Command {
    constructor(client) {
      super(client, {
        name: 'setwelcome',
        group: 'moderation',
        memberName: 'setwelcome',
        userPermissions: ['ADMINISTRATOR'],
        description: 'sets welcome',
      })
    }
  
  
  async run(message) {
    return await mongo().then(async (mongoose) => {
   
        try {
            const { guild, channel } = message

            await welcomeSchema.findOneAndUpdate(
              {
                _id: guild.id,
              },
              {
                _id: guild.id,
                channelId: channel.id,
              },
              {
                upsert: true,
                new: true,
              }
            )
        
            cache.set(guild.id, channel.id)
        
            message.reply('Welcome channel set!')
        } finally {
          
        }
      })
    }
}

module.exports.getChannelId = async (guildId) => {
    return await mongo().then(async (mongoose) => {
      const delay = ms => new Promise(res => setTimeout(res, ms));
          _id = guildId
          const result = await welcomeSchema.findOne({_id})
          const final = result.channelId
          await delay(1000);
          console.log(final)
          return final
})}
