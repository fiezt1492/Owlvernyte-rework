module.exports = {
    name: 'reset',
    aliases: [],
    category: 'Leveling',
    utilisation: '{prefix}reset',

    async execute(bot, message) {
      await message.author.reset()
      if (await message.author.isExists())
        return message.lineReplyNoMention("There is an error!")
      else 
        return message.lineReplyNoMention("Reset successfully!")
        
    },
};
