const blackjack = require("../../src/Blackjack/blackjack.js")
module.exports = {
    name: 'blackjack',
    aliases: ["bj"],
    category: 'Gambling',
    utilisation: '{prefix}blackjack',
    wait: false,
    
    async execute(bot, message) {
      
      let game = await blackjack(bot, message)
      // console.log(game)
      switch (game.result) {
        case "WIN":
          await message.author.updateOwlet(300)
          message.lineReply("Congratulation! u got me bitch")
          break;
        case "LOSE":
          message.lineReply("Boo!")
          break;
      }
      
    },
};
