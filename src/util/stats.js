export const matchesForPlayer = (playerId, tournament) => (
  tournament.matches.filter((match) => {
    return match.player1.id === playerId || match.player2.id === playerId
  })
)

export const wonMatches = (playerId, matchesForPlayer) => (
  matchesForPlayer.filter((match) => match.score && match.score.winnerId === playerId)
)

export const lostMatches = (playerId, matchesForPlayer) => (
  matchesForPlayer.filter((match) => match.score && match.score.winnerId != playerId)
)

export const unplayedMatches = (matchesForPlayer) => (
  matchesForPlayer.filter((match) => !match.score)
)

export const tiedMatches = (matchesForPlayer) => (
  matchesForPlayer.filter((match) => match.played && match.score && !match.score.winnerId)
)
