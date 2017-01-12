import React, { Component, PropTypes } from 'react'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import './TournamentSelector.css'

class TournamentSelector extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedTournament: '',
    }
  }

  componentDidMount() {
    if (this.state.selectedTournament) {
      this.selectTournament(this.state.selectedTournament)
    }
  }

  onTournamentChange(selectedTournament) {
    this.setState({ selectedTournament }, () => this.selectTournament(selectedTournament))
  }

  selectTournament(selectedTournament) {
    this.props.onTournamentSelected(selectedTournament)
  }

  render() {
    const { tournaments = [] } = this.props.data
    const tournamentItems = tournaments.map(tournament => {
      return <MenuItem key={tournament.id} value={tournament.id} primaryText={tournament.name} />
    })

    return (
      !this.props.data.loading && <div>
        <SelectField
          value={this.state.selectedTournament}
          floatingLabelText="Tournament"
          onChange={ (event, index, key) => this.onTournamentChange(key) }
          autoWidth={true}
          className="tournament-selector--select">
          {tournamentItems}
        </SelectField>
      </div>
    )
  }
}

const TournamentsListQuery = gql`
  query TournamentsListQuery {
    tournaments { name, id }
  }
`;

TournamentSelector.propTypes = {
  onTournamentSelected: PropTypes.func,
  data: PropTypes.shape({
    loading: PropTypes.bool.isRequired,
    tournaments: PropTypes.array,
  }).isRequired
}

export default graphql(TournamentsListQuery)(TournamentSelector)
