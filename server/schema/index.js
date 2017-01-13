module.exports = `
type Tournament {
  id: ID!
  name: String!
  progress: Int
  challongeURL: String
  players: [Player]
  matches: [Match]
}

type Player {
  id: ID!
  name: String!
}

type Match {
  player1: Player!
  player2: Player!
  played: Boolean!
  score: MatchScore
}

type MatchScore {
  players: [PlayerScore]
  winnerId: ID
}

type PlayerScore {
  player: Player
  score: Int
}

type Query {
  tournaments: [Tournament]
  tournament(id: Int!): Tournament
}
`
