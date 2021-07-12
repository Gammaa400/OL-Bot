const config = require('./config.json')
const loadFeatures = require('./features/load-features')
const path = require('path')
const Commando = require('discord.js-commando')
require('dotenv').config()
const client = new Commando.CommandoClient({
  owner: ['163396331585536010', '271437356450578442'],
  commandPrefix: config.prefix,
})
"test"
client.config = config
const { GiveawaysManager } = require('discord-giveaways');

const manager = new GiveawaysManager(client, {
  storage: './giveaways.json',
  updateCountdownEvery: 10000,
  hasGuildMembersIntent: true,
  default: {
      botsCanWin: false,
      embedColor: '#FF0000',
      embedColorEnd: '#000000',
      reaction: '🎉'
  }
});

client.giveawaysManager = manager;

client.on('ready', async () => {
  console.log('The client is ready!')


  client.registry
    .registerGroups([
      ['misc', 'misc commands'],
      ['moderation', 'moderation commands'],
      ['albion', 'albion commands'],
      ['economy', 'economy commands'],
    ])
    .registerDefaults()
    .registerCommandsIn(path.join(__dirname, 'cmds'))

    loadFeatures(client)
})

client.login(config.token)
