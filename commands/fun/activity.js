const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { MessageMenuOption, MessageMenu, MessageActionRow } = require('discord-buttons')
require("discordjs-activity")

module.exports = {
  name: "activity",
  aliases: ["act"],
  description: "Create Discord Activity",
  utilisation: "{prefix}activity",
  category: 'Fun',
  SlashCommand: {
    options: [
      {
        name: "youtube_together",
        description: "YouTube Together",
        type: 1,
        required: false,
      },
      {
        name: "watch_together_dev",
        description: "Watch Together (Dev)",
        type: 1,
        required: false,
      },
      {
        name: "fishington",
        description: "Fishington",
        type: 1,
        required: false,
      },
      {
        name: "chess_in_the_park",
        description: "Chess In The Park",
        type: 1,
        required: false,
      },
      {
        name: "chess_in_the_park_dev",
        description: "Chess In The Park (Dev)",
        type: 1,
        required: false,
      },
      {
        name: "betrayal",
        description: "Betrayal",
        type: 1,
        required: false,
      },
      {
        name: "doodlecrew",
        description: "Doodle Crew",
        type: 1,
        required: false,
      },
      {
        name: "wordsnacks",
        description: "Wordsnacks",
        type: 1,
        required: false,
      },
      {
        name: "lettertile",
        description: "Lettertile",
        type: 1,
        required: false,
      },
      {
        name: "poker_night",
        description: "Poker Night",
        type: 1,
        required: false,
      }
    ],
    // options: [
    //   {
    //     name: "selection",
    //     description: "...",
    //     type: 1,
    //     required: false,
    //     options: [
    //       {
    //         name: "youtube_together",
    //         description: "...",
    //         type: 1,
    //         required: false,
    //       },
    //       {
    //         name: "watch_together_dev",
    //         description: "...",
    //         type: 1,
    //         required: false,
    //       },
    //       {
    //         name: "fishington",
    //         description: "...",
    //         type: 1,
    //         required: false,
    //       },
    //       {
    //         name: "chess_in_the_park",
    //         description: "...",
    //         type: 1,
    //         required: false,
    //       },
    //       {
    //         name: "chess_in_the_park_dev",
    //         description: "...",
    //         type: 1,
    //         required: false,
    //       },
    //       {
    //         name: "betrayal",
    //         description: "...",
    //         type: 1,
    //         required: false,
    //       },
    //       {
    //         name: "doodlecrew",
    //         description: "...",
    //         type: 1,
    //         required: false,
    //       },
    //       {
    //         name: "wordsnacks",
    //         description: "...",
    //         type: 1,
    //         required: false,
    //       },
    //       {
    //         name: "lettertile",
    //         description: "...",
    //         type: 1,
    //         required: false,
    //       },
    //       {
    //         name: "poker_night",
    //         description: "...",
    //         type: 1,
    //         required: false,
    //       }
    //     ]
    //   }
    // ],
    run: async (client, interaction, args) => {
      let activity = interaction.data.options[0].name;
      const guild = client.guilds.cache.get(interaction.guild_id)
      const member = guild.members.cache.get(interaction.member.user.id)

      if (!member.voice.channel) return interaction.send("You must be in a voicechannel in order to create activity \`" + activity + "\`");
      // console.log(interaction)

      // switch (acitvity) {
      //   case "youtube_together":
      //   case "watch_together_dev":
      //   case "fishington":
      //   case "chess_in_the_park":
      //   case "chess_in_the_park_dev":
      //   case "betrayal":
      //   case "doodlecrew":
      //   case "wordsnacks":
      //   case "lettertile":
      //   case "poker_night":
      // }

      const Embed = new MessageEmbed().setColor("RANDOM")
      let VoiceID = member.voice.channel.id
      let VoiceChannel = client.channels.cache.get(String(VoiceID))
      let Invite = await VoiceChannel.activityInvite(activity)
      if (Invite) {
        Embed
          .setTitle(Invite.target_application.name)
          .setDescription(`${Invite.target_application.description}\n\n**__[JOIN ${Invite.target_application.name.toUpperCase()}](https://discord.com/invite/${Invite.code})__**\n\n⚠ **Note**: This feature now only works on desktop!`)
      }
      return interaction.send(Embed)
    }
  },
  //-------------------------------------------------
  async execute(client, message, args) {

    if (!message.member.voice.channel) return message.reply("You must be in a voicechannel in order to create an activity");

    const Embed = new MessageEmbed()
      .setTitle("Activity Selection Panel")
      .setColor("RANDOM")
      .setDescription("Choose one of these activity to continue")
      .setFooter(`Requested by ${message.author.tag} | 60 secs remaining`)

    const Youtube_together = new MessageMenuOption()
      .setLabel("Youtube Together")
      .setDescription("Create YouTube Together Activity")
      .setValue("youtube_together")

    const Watch_together_dev = new MessageMenuOption()
      .setLabel("Watch Together (Dev)")
      .setDescription("Create Watch Together (Dev) Activity")
      .setValue("watch_together_dev")

    const Fishington = new MessageMenuOption()
      .setLabel("Fishington")
      .setDescription("Create Fishington Activity")
      .setValue("fishington")

    const Chess_in_the_park = new MessageMenuOption()
      .setLabel("Chess In The Park")
      .setDescription("Create Chess In The Park Activity")
      .setValue("chess_in_the_park")

    const Chess_in_the_park_dev = new MessageMenuOption()
      .setLabel("Chess In The Park (Dev)")
      .setDescription("Create Chess In The Park (Dev) Activity")
      .setValue("chess_in_the_park_dev")

    const Betrayal = new MessageMenuOption()
      .setLabel("Betrayal")
      .setDescription("Create Betrayal Activity")
      .setValue("betrayal")

    const Doodlecrew = new MessageMenuOption()
      .setLabel("Doodlecrew")
      .setDescription("Create Doodlecrew Activity")
      .setValue("doodlecrew")

    const Wordsnacks = new MessageMenuOption()
      .setLabel("Wordsnacks")
      .setDescription("Create Wordsnacks Activity")
      .setValue("wordsnacks")

    const Lettertile = new MessageMenuOption()
      .setLabel("Lettertile")
      .setDescription("Create Lettertile Activity")
      .setValue("lettertile")

    const Poker_night = new MessageMenuOption()
      .setLabel("Poker Night")
      .setDescription("Create Poker Night Activity")
      .setValue("poker_night")

    const Menu = new MessageMenu()
      .setID('activity_menu')
      .setPlaceholder('Choose an activity')
      .addOption(Youtube_together)
      .addOption(Watch_together_dev)
      .addOption(Fishington)
      .addOption(Chess_in_the_park)
      .addOption(Chess_in_the_park_dev)
      .addOption(Betrayal)
      .addOption(Doodlecrew)
      .addOption(Wordsnacks)
      .addOption(Lettertile)
      .addOption(Poker_night)
    const Row = new MessageActionRow()
      .addComponent(Menu)

    const m = await message.channel.send({
      embed: Embed,
      components: [Row]
    })

    const filter = f => f.clicker.id === message.author.id

    const mCol = m.createMenuCollector(filter, {
      max: 1, time: 60000
    })

    mCol.on("collect", async menu => {
      // console.log(menu)
      menu.reply.defer()
      let VoiceID = message.member.voice.channel.id
      let VoiceChannel = client.channels.cache.get(String(VoiceID))
      let Invite = await VoiceChannel.activityInvite(menu.values[0])
      if (Invite) {
        Embed
          .setTitle(Invite.target_application.name)
          .setDescription(`${Invite.target_application.description}\n\n**__[JOIN ${Invite.target_application.name.toUpperCase()}](https://discord.com/invite/${Invite.code})__**\n\n⚠ **Note**: This feature now only works on desktop!`)
          .setFooter(`Requested by ${message.author.tag}`)

        mCol.stop()
        return m.edit({
          embed: Embed,
          components: []
        })
      }

    })

    mCol.on("end", (collected, reason) => {
      if (reason === "time") {
        Embed.setTitle("TIME OUT").setDescription("Your activity request has been eliminated").setColor("RED").setFooter(`Requested by ${message.author.tag}`)

        return m.edit({
          embed: Embed,
          components: []
        })
      }
    })


    //End
  }
};