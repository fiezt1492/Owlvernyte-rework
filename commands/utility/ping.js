module.exports = {
    name: 'ping',
    aliases: [],
    category: 'Utility',
    utilisation: '{prefix}ping',

    execute(bot, message) {
        message.lineReplyNoMention(`Pong! **${bot.ws.ping}ms**`);
    },
};