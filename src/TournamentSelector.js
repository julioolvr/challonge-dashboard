import React, { Component, PropTypes } from 'react'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

import './TournamentSelector.css'

// TODO: Remove once we get the real API
const tournaments = [
  { name: 'Copa SCV II', key: 'scv-copa_scv_ii' },
  { name: 'Paracopa I', key: 'scv-paracopa_i' },
  { name: 'Copa Ministro Aranguren - Conferencia Sur', key: 'scv-torneo_de_verano_sur' },
  { name: 'Copa Ministro Aranguren - Conferencia Norte', key: 'scv-torneo_de_verano_norte' },
  { name: 'Super Liga II - La Otra Categoría', key: 'scv-loc_ii' },
  { name: 'Super Liga II - Elite', key: 'scv-elite_ii' },
  { name: 'Copa SCV I', key: 'scv-copa_scv_i' },
  { name: 'Super Liga II - Paraliga', key: 'scv-paraliga_ii' }
]

const STORAGE_API_KEY = 'challongeApiKey'

class TournamentSelector extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tournamentKey: 'scv-torneo_de_verano_norte',
      apiKey: localStorage.getItem(STORAGE_API_KEY) || ''
    }
  }

  componentDidMount() {
    if (this.state.tournamentKey) {
      this.selectTournament(this.state.tournamentKey)
    }
  }

  onTournamentUrlChange(tournamentUrl) {
    this.setState({ tournamentUrl })
  }

  onTournamentChange(tournamentKey) {
    this.setState({ tournamentKey }, () => this.selectTournament(tournamentKey))
  }

  onApiKeyChange(e) {
    this.setState({ apiKey: e.target.value })
  }

  onFetchClick() {
    const tournamentKey = this.state.tournamentKey
    this.selectTournament(tournamentKey)
  }

  selectTournament(tournamentKey) {
    const { apiKey } = this.state

    fetch(`/tournaments/${tournamentKey}.json?api_key=${apiKey}&include_matches=1&include_participants=1`)
      .then(r => r.json())
      .then(response => response.tournament)
      .then(tournament => this.props.onTournamentSelected(tournament))
      .then(() => localStorage.setItem(STORAGE_API_KEY, apiKey))
  }

  render() {
    const tournamentItems = tournaments.map(tournament => {
      return <MenuItem key={tournament.key} value={tournament.key} primaryText={tournament.name} />
    })

    return (
      <div>
        <SelectField
          floatingLabelText="Tournament"
          value={this.state.tournamentKey}
          onChange={ (event, index, key) => this.onTournamentChange(key) }
          autoWidth={true}
          fullWidth={true}
          className="tournament-selector--select">

          {tournamentItems}
        </SelectField>
        <div style={{ display: 'none' }}>
          <label htmlFor="api-key">API Key:</label>
          <input
            id="api-key"
            type="text"
            value={this.state.apiKey}
            onChange={ e => this.onApiKeyChange(e) } />
        </div>
      </div>
    )
  }
}

TournamentSelector.propTypes = {
  onTournamentSelected: PropTypes.func
}

export default TournamentSelector
