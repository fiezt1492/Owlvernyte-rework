module.exports = {
    name: 'cointoss',
    aliases: ['ct','cointossing'],
    category: 'Fun',
    utilisation: '{prefix}cointoss',

    execute(bot, message) {

      coin = [
        'Head',
        'Tail',
      ];

      let c = coin[Math.floor(Math.random() * coin.length)]

      if (c === 'Head') {
        var i = 'https://media4.giphy.com/media/gK6L3woXfEALy3cmHV/giphy.gif'
      }
      else {
        var i = 'http://i.imgur.com/IcigPaK.gif'
      }

      return message.lineReplyNoMention({
        embed: {
          color: 'RANDOM',
          title: c,
          image: {url: i},
          footer: { text: `Requested by ${message.author.tag}`, icon_url: `${message.author.displayAvatarURL()}`},
          timestamp: new Date(),
        }
      })

    }

};