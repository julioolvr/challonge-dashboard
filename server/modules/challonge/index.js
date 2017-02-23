const fetch = require('isomorphic-fetch')
const { apiKey, baseURL, subdomain } = require('./constants')

const nullSafeParse = (parse) => (o) => o === null || o === undefined ? null : parse(o)
const parsePlayers = ({ participants }) => participants.map(parsePlayer)
const parsePlayer = nullSafeParse(
  ({ participant }) => ({
    id: participant.id,
    name: participant.name
  })
)

const parseMatches = (tournament) => {
  switch (convertTournamentType(tournament.tournament_type)) {
    case 'League':
      return parseMatchesLeague(tournament)
    case 'SingleElimination':
      return parseMatchesSingleElimination(tournament)
    default:

  }
}

const playerFinder = (participants) =>
  (playerId) =>
      parsePlayer(participants.find(p => p.participant.id === playerId))

const parseMatchesLeague = ({ matches, participants }) => matches.map(parseMatch(playerFinder(participants)))

const parseMatch = (findPlayer) => ({ match }) => {

  const [scoreP1, scoreP2] = match.scores_csv !== '' ? match.scores_csv.split('-') : [undefined, undefined]

  const player1 = findPlayer(match.player1_id)
  const player2 = findPlayer(match.player2_id)

  const played = match.state === 'complete'

  return {
    player1,
    player2,
    played,
    score: {
      players: [{
        player: player1,
        score: Number(scoreP1)
      },{
        player: player2,
        score: Number(scoreP2)
      }],
      winnerId: match.winner_id
    }
  }
}

const parseMatchesSingleElimination = ({ matches, participants}) => {
  const findPlayer = playerFinder(participants)

  const maximumRounds = Math.max(...matches.map(( {match: {round}}) => round))
  const challongeLastMatch = matches.find( ({ match }) => match.round === maximumRounds)
  const nodeCount = Math.pow(2, maximumRounds)

  const lastMatch = {...parseMatch(findPlayer)(challongeLastMatch), round: maximumRounds, order: 1}

  const allMatches = [lastMatch, ...matchesForNextMatch(lastMatch.order, challongeLastMatch, matches, maximumRounds - 1, findPlayer)]

  const invertOrder = (m) => ({...m, order: nodeCount - m.order})
  return  allMatches.map( invertOrder )
}

const matchesForNextMatch = (order, challongeLastMatch, challongeMatches, round, findPlayer) => {
  const isLeaf = !challongeLastMatch.match.player1_prereq_match_id && !challongeLastMatch.match.player2_prereq_match_id
  if( isLeaf ) {
    return []
  }


  const processBranch = (playerIdField, previousMatchIdField, order) => {
    if( challongeLastMatch.match[previousMatchIdField] ) {
      const previousMatchPlayer1 = challongeMatches.find( ({match}) => match.id === challongeLastMatch.match[previousMatchIdField])
      const match1 = {...parseMatch(findPlayer)(previousMatchPlayer1), order, round }
      const nextMatches = matchesForNextMatch(match1.order, previousMatchPlayer1, challongeMatches, round - 1, findPlayer)

      return [match1, ...nextMatches]
    }
    else {
      return[
        {...parseMatch(findPlayer)({
          match: {
            player1_id: null,
            player2_id: null,
            [playerIdField]: challongeLastMatch.match[playerIdField],
            state: 'complete',
            scores_csv: '',
            winner_id: challongeLastMatch.match[playerIdField]
          }
        }), order, round}
      ]
    }
  }

  return [
    ...processBranch('player1_id', 'player1_prereq_match_id', 2 * order + 1),
    ...processBranch('player2_id', 'player2_prereq_match_id', 2 * order )
  ]
}

const parseTournament = ({ tournament }) => {
  const players = tournament.participants ? parsePlayers(tournament) : null
  const matches = tournament.matches ? parseMatches(tournament) : null

  return {
    id: tournament.id,
    type: convertTournamentType(tournament.tournament_type),
    name: tournament.name,
    progress: tournament.progress_meter,
    challongeURL: tournament.full_challonge_url,
    players,
    matches
  }
}

const convertTournamentType = (type) => {
  // Challonge types:
  //    * single elimination
  //    * double elimination
  //    * round robin
  //    * swiss
  switch(type) {
    case 'single elimination':  return 'SingleElimination'
    case 'double elimination':  return 'DouleElimination'
    case 'round robin':         return 'League'
    default:                    return 'Unknown'
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

module.exports = { getTournaments, getTournament, test: { parseTournament } }
