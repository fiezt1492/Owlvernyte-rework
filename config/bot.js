module.exports = {
  discord: {
    prefix: process.env.PREFIX,
    token: process.env.TOKEN,
    activity: {
      name: 'o.help | fun stuff',
      type: 0,
    },
  },
  database: {
    mongo: process.env.MONGO_CONNECT
  }
};