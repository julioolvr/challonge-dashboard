import React, { Component } from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'

import './App.css'
import TournamentSelector from './TournamentSelector'
import Dashboard from './Dashboard'

injectTapEventPlugin()

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
        <header>
          <TournamentSelector onTournamentSelected={ tournament => this.onTournamentSelected(tournament) }/>
        </header>
        <Dashboard tournament={this.state.tournament} />
      </div>
    )
  }
}

export default () => {
  return <MuiThemeProvider>
    <App />
  </MuiThemeProvider>
}
