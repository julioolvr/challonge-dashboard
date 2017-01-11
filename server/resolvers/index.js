const { getTournaments, getTournament } = require('../modules/challonge')

module.exports = {
  Query: {
    tournaments() {
      return getTournaments()
    },
    tournament(root, args) {
      const { id } = args
      return getTournament(id)
    }
  }
}
