module.exports = {
    name: 'start',
    aliases: [],
    category: 'Leveling',
    utilisation: '{prefix}start',

    async execute(bot, message) {
      if (!await message.author.isExists())
        await message.author.start()
      else
        return message.lineReplyNoMention("You already have started!")
      if (await message.author.isExists())
        return message.lineReplyNoMention("Create successfully!")
      else 
        return message.lineReplyNoMention("There is an error!")
    },
};
