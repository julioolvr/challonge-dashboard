import React, { Component, PropTypes } from 'react'

function tournamentKeyFromUrl(url) {
  const [, org, tournamentName] = url.match(/(?:https?:\/\/)?(?:(\w+?)\.)?challonge\.com\/(\w+)/)
  return org ? `${org}-${tournamentName}` : tournamentName
}

class TournamentSelector extends Component {
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
  }

  render() {
    return (
      <div>
        <label htmlFor="tournament-url">Tournament URL:</label>
        <input id="tournament-url" type="text" onChange={ e => this.onTournamentUrlChange(e) } />
        <label htmlFor="api-key">API Key:</label>
        <input id="api-key" type="password" onChange={ e => this.onApiKeyChange(e) } />
        <button onClick={ () => this.onFetchClick() }>Fetch</button>
      </div>
    )
  }
}

TournamentSelector.propTypes = {
  onTournamentSelected: PropTypes.func
}

export default TournamentSelector
