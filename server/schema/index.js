module.exports = `

enum TournamentType {
  SingleElimination
  DouleElimination
  League
  Unknown
}

# For tournaments of type SingleElimination the complete tree of matches
# is returned. It can be traversed either from the root or going from
# round = 1 to max of rounds, and the going through the order of the matches
type Tournament {
  id: ID!
  type: TournamentType!
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

# Players might be null if the match is part of an elimination tournament
# and the branch hasn't been decided yet
type Match {
  player1: Player
  player2: Player
  played: Boolean!
  score: MatchScore
  order: Int
  round: Int
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
  tournament(id: ID!): Tournament
}
`
