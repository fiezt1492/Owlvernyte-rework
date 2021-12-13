const { Client, Intents } = require('discord.js');
const keepAlive = require('./server')

const { readdirSync } = require('fs')
const structures = readdirSync('./src/Structure/')
  .filter(file => file.endsWith('.js'));
for (const file of structures) {
  require(`./src/Structure/${file}`);
  console.log(file)
}

require('discord-reply');
const bot = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_VOICE_STATES
  ],
  disableMentions: "everyone"
})
bot.config = require('./config/bot');

bot.getUserFromMention = async (mention) => {
  const matches = mention.match(/^<@!?(\d+)>$/);
  if (!matches) return;
  const id = matches[1];
  return await bot.users.fetch(id);
}
require('discord-buttons')(bot)
bot.ws.on("INTERACTION_CREATE", async (interaction) => {
  const command = interaction.data.name.toLowerCase();
  const args = interaction.data.options;

  interaction.guild = await bot.guilds.fetch(interaction.guild_id);
  interaction.send = async (message) => {
    return await bot.api
      .interactions(interaction.id, interaction.token)
      .callback.post({
        data: {
          type: 4,
          data:
            typeof message == "string"
              ? { content: message }
              : message.type && message.type === "rich"
                ? { embeds: [message] }
                : message,
        },
      });
  };

  let cmd = bot.commands.get(command);
  if (cmd.SlashCommand && cmd.SlashCommand.run)
    cmd.SlashCommand.run(bot, interaction, args);
})

require("./src/loader.js")(bot)
// keepAlive()
bot.login(bot.config.discord.token)