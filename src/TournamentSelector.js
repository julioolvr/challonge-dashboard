import React, { Component, PropTypes } from 'react'

function tournamentKeyFromUrl(url) {
  const [, org, tournamentName] = url.match(/(?:https?:\/\/)?(?:(\w+?)\.)?challonge\.com\/(\w+)/)
  return org ? `${org}-${tournamentName}` : tournamentName
}

const STORAGE_API_KEY = 'challongeApiKey'

class TournamentSelector extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tournamentUrl: '',
      apiKey: localStorage.getItem(STORAGE_API_KEY) || ''
    }
  }

  onTournamentUrlChange(e) {
    this.setState({ tournamentUrl: e.target.value })
  }

  onApiKeyChange(e) {
    this.setState({ apiKey: e.target.value })
  }

  onFetchClick() {
    const { tournamentUrl, apiKey } = this.state
    const tournamentKey = tournamentKeyFromUrl(tournamentUrl)

    fetch(`/tournaments/${tournamentKey}.json?api_key=${apiKey}&include_matches=1&include_participants=1`)
      .then(r => r.json())
      .then(response => response.tournament)
      .then(tournament => this.props.onTournamentSelected(tournament))
      .then(() => localStorage.setItem(STORAGE_API_KEY, apiKey))
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
        <label htmlFor="api-key">API Key:</label>
        <input
          id="api-key"
          type="text"
          value={this.state.apiKey}
          onChange={ e => this.onApiKeyChange(e) } />
        <button onClick={ () => this.onFetchClick() }>Fetch</button>
      </div>
    )
  }
}

TournamentSelector.propTypes = {
  onTournamentSelected: PropTypes.func
}

export default TournamentSelector
