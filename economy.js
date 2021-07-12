const { DiscordAPIError } = require('discord.js')
const mongo = require('./mongo')
const profileSchema = require('./schemas/profile-schema')

module.exports = (client) => {}

module.exports.addCoins = async (name, guildId, userId, coins) => {
  return await mongo().then(async (mongoose) => {
    try {

      const result = await profileSchema.findOneAndUpdate(
        {
          guildId,
          userId,
        },
        {
          name,
          guildId,
          userId,
          lb: "all",
          $inc: {
            coins,
          },
        },
        {
          upsert: true,
          new: true,
        }
      )

      return result.coins
    } finally {
      
    }
  })
}

module.exports.getCoins = async (name, guildId, userId) => {
  const cachedValue = coinsCache[`${guildId}-${userId}`]
  if (cachedValue) {
    return cachedValue
  }
  return await mongo().then(async (mongoose) => {
    try {

      const result = await profileSchema.findOne({
        guildId,
        userId
      })

      let coins = 0
      if (result) {
        coins = result.coins
      } else {
        await new profileSchema({
          name,
          guildId,
          userId,
          lb: "all",
          coins,
        }).save()
      }

      return coins
      
    } finally {
    }
  })
}

module.exports.getLB = async (limit) => {
  const Discord = require('discord.js')
  const { MessageEmbed } = require("discord.js");
  return await mongo().then(async (mongoose) => {
    try {
       let skip = limit - 10
       const totalResults = await profileSchema.find({}).sort({"coins": -1}).limit(limit).skip(skip)

       const LeaderBoard = new Discord.MessageEmbed()
       .setTitle(`LeaderBoard`)
       .setColor(`GREEN`)
       .setTimestamp()
        let position = skip
        let Totallength = 10

        for (let counter = 0; counter < Totallength; ++counter)
        {
          ++position
          const { name, coins} = totalResults[counter]
          LeaderBoard.addFields({ name: `#${position} ${name}`, value: `Total: ` + new Intl.NumberFormat().format(coins)})
        }


      return LeaderBoard
    } finally {
        mongoose.connection.close()
      }
  })
  
}


module.exports.getTotal = async () => {
  const Discord = require('discord.js')
  const { MessageEmbed } = require("discord.js");
  return await mongo().then(async (mongoose) => {
    try {

      const total = (await profileSchema.aggregate([{ $group: { _id: null, count: { $sum: "$coins" }}}, { $unset: "_id" } ])).map(function(el) { return el.count })


       console.log('RESULT:', total)

       let Final = total

      return total
    } finally {
        mongoose.connection.close()
      }
  })
  
}



module.exports.resetCoins = async (name, guildId, userId, coins) => {
  return await mongo().then(async (mongoose) => {
   
    try {

      const result = await profileSchema.findOneAndUpdate(
        {
          guildId,
          userId,
        },
        {
          name,
          guildId,
          userId,
          lb: "all",
          $mul: {
            coins,
          }
        },
        {
          upsert: true,
          new: true,
        }
      )
      return result.coins
    } finally {
    }
  })
}

module.exports.DBLoop = async () => {
  const Discord = require('discord.js')
  const { MessageEmbed } = require("discord.js");
  return await mongo().then(async (mongoose) => {
    try {

       const Loop = await profileSchema.find({})

      const length = Loop.length




      return Loop
    } finally {

      }
  })
  
}
module.exports.DeleteOne = async (userId) => {
  const Discord = require('discord.js')
  const { MessageEmbed } = require("discord.js");
  return await mongo().then(async (mongoose) => {
    try {


      const test = await profileSchema.findOneAndDelete({userId})

      console.log(test)
      return 'Deleted'
    } finally {

      }
  })
  
}




























// module.exports.getGift = async (name, guildId, userId) => {
//   const Discord = require('discord.js')
//   const { MessageEmbed } = require("discord.js");
//   return await mongo().then(async (mongoose) => {
//     try {

//        const result = await valentineSchema.findOne({
//         guildId,
//         userId
//       })
//       // Gift Amount
//       const coins = 250000

//       let test = 0
//       let claimed = false 
//       let Tracker = 0
//       if (!result) {
//         console.log('Inserting a document')
//         await new valentineSchema({
//           name,
//           guildId,
//           userId,
//           Tracker,
//         }).save()

//         Tracker = 1
//         const giftResult = await valentineSchema.findOneAndUpdate(
//           {
//             guildId,
//             userId,
//           },
//           {
//             name,
//             guildId,
//             userId,
//             $inc: {
//               Tracker,
//             },
//           },
//           {
//             upsert: true,
//             new: true,
//           }
//         )
//       }

//       if(result && Tracker != 1)
//       {
//         claimed = true 
//       }



//       return claimed
//     } finally {

//       }
//   })
  
// }