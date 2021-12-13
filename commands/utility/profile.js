module.exports = {
    name: 'profile',
    aliases: ['p'],
    category: 'Utility',
    utilisation: '{prefix}profile',

    async execute(bot, message) {
        await message.author.getInfo()
        message.channel.send(await message.author.profile)
    },
};
