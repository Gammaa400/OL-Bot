const Commando = require('discord.js-commando')

module.exports = class AddCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'get',
      group: 'misc',
      memberName: 'get',
      description: '<Time>',
      argsType: 'single',
    })
  }



  async run(message, args) 
  {
    var result = (args - Math.floor(args)) !== 0; 
   
    if (!result){args = args + ':00'}
    

    var timeRequested = args.split(":") 
    const startTime = new Date()
    const endTime = new Date()
    endTime.setUTCHours(timeRequested[0], timeRequested[1])

    let hourDiff = endTime.getUTCHours() - startTime.getUTCHours()
    let minuteDiff = endTime.getUTCMinutes() - startTime.getUTCMinutes()

    if (hourDiff < 0) 
    {
      hourDiff = 24 + hourDiff;
    }
    if(minuteDiff < 0)
    {
      hourDiff = hourDiff + 1
      minuteDiff = 60 + minuteDiff;
    }

   console.log(hourDiff, minuteDiff)
  }
}
/*
let client = this.client
const Discord = require('discord.js');
const today = new Date("1 January 2000 " + args[0] + ":35 GMT+00:00");


const [hourstill, minutestill] = UpdatedTime(args)



function UpdatedTime(args){


  
  const today2 = new Date();
  var hours = today.getUTCHours();
  var minutes = today.getUTCMinutes();
  var hours2 = today2.getUTCHours();
  var minutes2 = today2.getUTCMinutes();

  var hourstill = hours - hours2;
  var minutestill = minutes - minutes2;
  if(args[0] < 24)
  {
    const today = new Date("1 January 2000 " + args[0] + ":00 GMT+00:00");
    const today2 = new Date();
    var hours = today.getUTCHours();
    var minutes = today.getUTCMinutes();
    var hours2 = today2.getUTCHours();
    var minutes2 = today2.getUTCMinutes();

    var hourstill = hours - hours2;
    var minutestill = minutes - minutes2;
    if (hourstill > 0) {
      if (minutestill < 0) {
        hourstill = hours - hours2 - 1;
        minutestill = 60 + minutes - minutes2;
      } else if (minutestill > 0) {
        hourstill = hours - hours2; 
      }
    } else if (hourstill <= -1) {
      if (minutestill < 0) {
        hourstill = 24 + hours - hours2 - 1;
        minutestill = 60 + minutes - minutes2;
      } else if (minutestill > 0) {
        hourstill = 24 + hours - hours2;
      }
    }
    return [hourstill, minutestill]
  }else
  {
  if (hourstill > 0) {
    if (minutestill < 0) {
      hourstill = hours - hours2 - 1;
      minutestill = 60 + minutes - minutes2;
    } else if (minutestill > 0) {
      hourstill = hours - hours2; 
    }
  } else if (hourstill <= -1) {
    if (minutestill < 0) {
      hourstill = 24 + hours - hours2 - 1;
      minutestill = 60 + minutes - minutes2;
    } else if (minutestill > 0) {
      hourstill = 24 + hours - hours2;
    }
  }
  return [hourstill, minutestill]

  }
}
const delay = ms => new Promise(res => setTimeout(res, ms));
const today2 = new Date();
const Time = new Discord.MessageEmbed()
.setFooter("OverLooked", message.guild.iconURL())
.setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true, format: `png` }))
.setColor(`RANDOM`)
.setTitle(`${args[0]} UTC Is in ${hourstill} Hours and ${minutestill} Minutes`)
.setTimestamp()

var Msg = await message.channel.send(Time);
if(hourstill <= 0 && minutestill < 0){
  Msg.edit(Time.setTitle(`${args[0]} UTC Has Passed.`))
}

while(hourstill >= 0 && minutestill >= 0){

  await delay(60000);
  const [hourstill, minutestill] = UpdatedTime(args)

  Msg.edit(Time.setTitle(`${args[0]} UTC Is in ${hourstill} Hours and ${minutestill} Minutes`))

  if(hourstill <= 0 && minutestill < 0){
    Msg.edit(Time.setTitle(`${args[0]} UTC Has Passed.`))
    break
  }
}
*/