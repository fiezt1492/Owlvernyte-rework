module.exports = {
    name: 'stats',
    aliases: ['stat'],
    category: 'Core',
    utilisation: '{prefix}stats',

    async execute(bot, message, args) {

      return message.channel.send({
        embed:{
          color: `RANDOM`,
          title: `STATS`,
          fields: [
            {
              name: `ID`,
              value: `${bot.user.id}`,
              inline: true
            },
            {
              name: `USERS`,
              value: `${bot.users.cache.size}`,
              inline: true
            },
            {
              name: `CHANNELS`,
              value: `${bot.channels.cache.size}`,
              inline: true
            },
            {
              name: `SERVERS`,
              value: `${bot.guilds.cache.size}`,
              inline: true
            },
            {
              name: `PING`,
              value: `${bot.ws.ping}ms`,
              inline: true
            },
            
          ]
        }
      })

    }
}