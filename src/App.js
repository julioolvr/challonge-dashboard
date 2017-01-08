import React, { Component } from 'react'
import './App.css'

import TournamentSelector from './TournamentSelector'
import Dashboard from './Dashboard'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  onTournamentSelected(tournament) {
    this.setState({ tournament })
  }

  render() {
    return (
      <div>
        <TournamentSelector onTournamentSelected={ tournament => this.onTournamentSelected(tournament) }/>
        <Dashboard tournament={this.state.tournament} />
      </div>
    )
  }
}

export default App
