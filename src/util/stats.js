export const matchesForPlayer = (playerId, tournament) => (
  tournament.matches.filter((match) => {
    return match.player1.id === playerId || match.player2.id === playerId
  })
)

export const hasWonMatch = (playerId, match) => match.score && match.score.winnerId === playerId

export const hasLostMatch = (playerId, match) => match.score && match.score.winnerId && match.score.winnerId !== playerId

export const wonMatches = (playerId, matchesForPlayer) => (
  matchesForPlayer.filter((match) => hasWonMatch(playerId, match))
)

export const lostMatches = (playerId, matchesForPlayer) => (
  matchesForPlayer.filter((match) => hasLostMatch(playerId, match))
)

export const unplayedMatches = (matchesForPlayer) => (
  matchesForPlayer.filter((match) => !match.played)
)

export const tiedMatches = (matchesForPlayer) => (
  matchesForPlayer.filter((match) => match.played && match.score && !match.score.winnerId)
)

export const goalsMadeInMatch = (match, playerId) => match.played && match.score.players.find(p => p.player.id === playerId).score

export const goalsMade = (playerId, matchesForPlayer) => (
  matchesForPlayer.filter(m => Boolean(m.played)).reduce((goals, match) => {
    return goals + goalsMadeInMatch(match, playerId)
  }, 0)
)

export const goalsAgainst = (playerId, matchesForPlayer) => (
  matchesForPlayer.filter(m => Boolean(m.played)).reduce((goals, match) => {
    const goalsReceivedInMatch = match.score.players.find(p => p.player.id !== playerId).score
    return goals + goalsReceivedInMatch
  }, 0)
)
