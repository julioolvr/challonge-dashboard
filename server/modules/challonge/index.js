const fetch = require('isomorphic-fetch')
const { apiKey, baseURL, subdomain } = require('./constants')

const parsePlayers = ({ participants }) => participants.map(parsePlayer)
const parsePlayer = ({ participant }) => ({
  id: participant.id,
  name: participant.name
})

const parseMatches = ({ matches, participants }) => matches.map(({ match }) => {
  const [scoreP1, scoreP2] = match.scores_csv.split('-')
  const played = match.state === 'complete'
  const player1 = parsePlayer(participants.find(p => p.participant.id === match.player1_id))
  const player2 = parsePlayer(participants.find(p => p.participant.id === match.player2_id))

  return {
    player1,
    player2,
    played,
    score: played ? {
      players: [{
        player: player1,
        score: scoreP1
      },{
        player: player2,
        score: scoreP2
      }],
      winnerId: match.winner_id
    } : null
  }
})

const parseTournament = ({ tournament }) => {
  const players = tournament.participants ? parsePlayers(tournament) : null
  const matches = tournament.matches ? parseMatches(tournament) : null

  return {
    id: tournament.id,
    name: tournament.name,
    progress: tournament.progress_meter,
    challongeURL: tournament.full_challonge_url,
    players,
    matches
  }
}

const getTournaments = () => (
  fetch(`${baseURL}/tournaments.json?api_key=${apiKey}&subdomain=${subdomain}`)
    .then(response => response.json())
    .then(tournaments => tournaments.map(parseTournament))
)

const getTournament = (id) => {
  return fetch(`${baseURL}/tournaments/${id}.json?api_key=${apiKey}&include_matches=1&include_participants=1`)
    .then(response => response.json())
    .then(parseTournament)
}

module.exports = { getTournaments, getTournament }
