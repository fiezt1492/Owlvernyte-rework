const got = require('got');
const { MessageEmbed } = require('discord.js');
const { MessageButton, MessageActionRow } = require('discord-buttons')

module.exports = {
  name: 'meme',
  aliases: [],
  category: 'Fun',
  utilisation: '{prefix}meme + <subreddit>',

  async execute(bot, message, args) {

    let subreddit = args.join("_")

    if (!isNaN(Number(subreddit)))
      subreddit = null
    const embed = new MessageEmbed()
      .setColor("RANDOM");
    let http;
    let post;

    let row = new MessageActionRow()
      .addComponents(
        new MessageButton()
          .setID('more')
          .setLabel("More!")
          .setStyle('green'),
        new MessageButton()
          .setID('stop')
          .setLabel('Stop')
          .setStyle('grey')
      )

    try {
      http = await got(`https://meme-api.herokuapp.com/gimme/${subreddit ? subreddit : ''}`)
      post = JSON.parse(http.body);
      embed
        .setAuthor(`u/${post.author}`)
        .setTitle(post.title)
        .setURL(post.postLink)
        .setFooter(`r/${post.subreddit} | ⬆ ${post.ups} | Using D3vd's meme api`)
      if (!(post.nsfw || post.spoiler)) embed.setImage(post.url)
      else embed.setImage("https://cdn130.picsart.com/322803413346201.jpg").setDescription(`⚠ This image is set as **NSFW/Spoiler**.\n||Click **[here](${post.url})** if you want to reveal.||`)
    } catch (error) {
      // console.log(error)
      if (error.code === "ERR_NON_2XX_3XX_RESPONSE") return message.lineReplyNoMention(`**[ERROR]** I can't find any meme in \`r/${subreddit}\``);

      embed.setColor("RED").setTitle("ERROR").setDescription(error)
      return message.lineReplyNoMention(embed)
    }

    // if (embed.title == null) return message.lineReplyNoMention("not found");

    const m = await message.channel.send({
      embed: embed,
      components: [row]
    })

    const filter = b => b.clicker.user.id === message.author.id

    const mCol = m.createButtonCollector(filter, { time: 30000 })

    mCol.on("collect", async btn => {
      btn.reply.defer()
      if (btn.id === 'stop') return mCol.stop();
      if (btn.id === 'more') {
        mCol.resetTimer()
        try {
          http = await got(`https://meme-api.herokuapp.com/gimme/${subreddit ? subreddit : ''}`)
          post = JSON.parse(http.body);
          embed
            .setAuthor(`u/${post.author}`)
            .setTitle(post.title)
            .setURL(post.postLink)
            .setFooter(`r/${post.subreddit} | ⬆ ${post.ups} | Using D3vd's meme api`)
          if (!(post.nsfw || post.spoiler)) embed.setImage(post.url)
          else embed.setImage("https://cdn130.picsart.com/322803413346201.jpg").setDescription(`⚠ This image is set as **NSFW/Spoiler**.\n||Click **[here](${post.url})** if you want to reveal.||`)
        } catch (error) {
          console.log(error)
          return message.lineReplyNoMention(error)
        }
      }

      return m.edit(embed)
    })

    mCol.on("end", (collected, reason) => {
      row = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setID('more')
            .setLabel("More!")
            .setStyle('green')
            .setDisabled(true),
          new MessageButton()
            .setID('stop')
            .setLabel('Stop')
            .setStyle('grey')
            .setDisabled(true)
        )

      return m.edit({
        embed: embed,
        components: [row]
      })
    })
  },
};
