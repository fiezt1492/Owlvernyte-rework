const { MessageEmbed, Structures } = require('discord.js')

const db = require('../Database/mongo')
const players = db.collection('players')
class NewUser extends Structures.get("User") {
  constructor(client, data) {
    super(client, data)
  } 
  async getInfo() {
    const info = await players.findOne({id: this.id})
    this.info = info
    return info
  }
  get profile() {
    if (!this.info) return new MessageEmbed()
    .setColor("RED")
    .setTitle("ERROR")
    .setDescription(`You don't have a profile. Please create one.`)
    const e = new MessageEmbed()
    .setColor("RANDOM")
    .setAuthor(`${this.username}`, `${this.displayAvatarURL({ dynamic: true })}`)
    .addFields({
      name: "Currency",
      value: `Owlet: ${this.info.currency.owlet}\nBank: ${this.info.currency.bank}\nNyte Gem: ${this.info.currency.nyteGem}`
    })
    .setThumbnail(`${this.displayAvatarURL({dynamic : true})}`)
    .setFooter('...', this.displayAvatarURL()) 
    return e
  }
  async isExists() {
    return !!(await players.count({id: this.id}, { limit: 1}))
  }
  async reset() {
    await players.deleteOne({id: this.id})
  }
  async updateOwlet(amount) {
    await players.updateOne(
      {id : this.id},
      {$inc: {"currency.owlet": amount}}
    )
  }
  
  async start() {
    await players.insertOne({
      id: this.id,
      currency: {
        owlet: 0,
        nyteGem: 0,
        bank: 0
      },
      process: {
        level: 1,
        exp: 0
      },
      stat: {
        hp: 100,
        mp: 100,
        physic: 1,
        magic: 1,
        armor: 1,
        res: 1,
        speed: 1,
        range: 1
      },
      bag: {
        type: 1,
        item: []
      },
      equipment: {
        // leftHand: null,
        // rightHand: null,
        // headGear: null,
        // bodyGear: null,
        // legGear: null,
        jewels: []
      }
    })
  }
}
Structures.extend('User', () => NewUser)