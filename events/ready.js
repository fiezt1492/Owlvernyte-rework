const Discord = require('discord.js')
module.exports = async (bot) => {

  console.log(`Logged in as ${bot.user.username}. Ready on ${bot.guilds.cache.size} servers, for a total of ${bot.users.cache.size} users`);

  const actvs = [
    `${process.env.PREFIX}help | fun stuff`,
    `${process.env.PREFIX}help | I'm not finished yet`,
    `${process.env.PREFIX}help | serving ${bot.guilds.cache.size} servers`,
    `${process.env.PREFIX}help | @Owlvernyte if you forget sth`,
  ];

  bot.guilds.cache.forEach((guild) => {
    require("../src/Util/RegisterSlashCommands.js")(bot, guild.id);
  });

  let i = 0;

  setInterval(() => {
    if (i === actvs.length) i = 0;
    const stt = actvs[i];
    bot.user.setActivity(stt, { type: 0 }).catch(console.error)
    i++;
  }, 300000);

  // bot.user.setActivity(actvs[Math.floor(Math.random() * (actvs.length - 1) + 1)]);
  //   setInterval(() => {
  //       bot.user.setActivity(actvs[Math.floor(Math.random() * (actvs.length - 1) + 1)]);
  //   }, 20000);

  // bot.user.setActivity(bot.config.discord.activity);

};