export const matchesForPlayer = (playerId, tournament) => (
  tournament.matches.filter((match) => {
    return match.player1.id === playerId || match.player2.id === playerId
  })
)

export const wonMatches = (playerId, matchesForPlayer) => (
  matchesForPlayer.filter((match) => match.score && match.score.winnerId === playerId)
)

export const lostMatches = (playerId, matchesForPlayer) => (
  matchesForPlayer.filter((match) => match.score.winnerId && match.score.winnerId !== playerId)
)

export const unplayedMatches = (matchesForPlayer) => (
  matchesForPlayer.filter((match) => !match.played)
)

export const tiedMatches = (matchesForPlayer) => (
  matchesForPlayer.filter((match) => match.played && match.score && !match.score.winnerId)
)

export const goalsMade = (playerId, matchesForPlayer) => (
  matchesForPlayer.filter(m => Boolean(m.played)).reduce((goals, match) => {
    const goalsMadeInMatch = match.score.players.find(p => p.player.id === playerId).score
    return goals + goalsMadeInMatch
  }, 0)
)

export const goalsAgainst = (playerId, matchesForPlayer) => (
  matchesForPlayer.filter(m => Boolean(m.played)).reduce((goals, match) => {
    const goalsReceivedInMatch = match.score.players.find(p => p.player.id !== playerId).score
    return goals + goalsReceivedInMatch
  }, 0)
)
