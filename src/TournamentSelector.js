import React, { Component, PropTypes } from 'react'

function tournamentKeyFromUrl(url) {
  const [, org, tournamentName] = url.match(/(?:https?:\/\/)?(?:(\w+?)\.)?challonge\.com\/(\w+)/)
  return org ? `${org}-${tournamentName}` : tournamentName
}

class TournamentSelector extends Component {
  constructor(props) {
    super(props)

    if (!process.env.REACT_APP_CHALLONGE_API_KEY) {
      throw new Error('Please set a .env file in your root and set REACT_APP_CHALLONGE_API_KEY')
    }

    this.state = {
      tournamentUrl: '',
      apiKey: process.env.REACT_APP_CHALLONGE_API_KEY
    }
  }

  onTournamentUrlChange(e) {
    this.setState({ tournamentUrl: e.target.value })
  }

  onFetchClick() {
    const { tournamentUrl, apiKey } = this.state
    const tournamentKey = tournamentKeyFromUrl(tournamentUrl)

    fetch(`/tournaments/${tournamentKey}.json?api_key=${apiKey}&include_matches=1&include_participants=1`)
      .then(r => r.json())
      .then(response => response.tournament)
      .then(tournament => this.props.onTournamentSelected(tournament))
  }

  render() {
    return (
      <div>
        <label htmlFor="tournament-url">Tournament URL:</label>
        <input
          id="tournament-url"
          type="text"
          value={this.state.tournamentUrl}
          onChange={ e => this.onTournamentUrlChange(e) } />
        <button onClick={ () => this.onFetchClick() }>Fetch</button>
      </div>
    )
  }
}

TournamentSelector.propTypes = {
  onTournamentSelected: PropTypes.func
}

export default TournamentSelector
