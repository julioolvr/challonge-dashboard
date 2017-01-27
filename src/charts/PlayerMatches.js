import React from 'react';
import {
  Table as MUITable,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';
import * as colors from 'material-ui/styles/colors'

import {
  matchesForPlayer,
  goalsMadeInMatch
} from '../util/stats'

const PlayerMatches = (props) => {
  const { tournament, playerId } = props

  const playerName = (playerId) =>
    tournament.players.find(p => p.id === playerId).name

  const matches = matchesForPlayer(playerId, tournament)
    .sort((match1, match2) => match2.played - match1.played)

  const localStyle = {textAlign:'right'}
  const resultStyle = {paddingRight: '0', paddingLeft:'0', width:'35px', textAlign: 'center'}

  return (
    <MUITable selectable={false} fixedHeader={true}>
      <TableHeader
        displaySelectAll={false}
        adjustForCheckbox={false}
      >
        <TableRow>
          <TableHeaderColumn style={localStyle}>Local</TableHeaderColumn>
          <TableHeaderColumn style={resultStyle}></TableHeaderColumn>
          <TableHeaderColumn>Visitante</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody displayRowCheckbox={false} stripedRows={false}>
        {matches.map( (match, key) => <TableRow key={key} style={match.played ? {backgroundColor:colors.green200} : {}}>
                    <TableRowColumn style={localStyle}>{playerName(match.player1.id)}</TableRowColumn>
                    <TableRowColumn style={resultStyle}>{goalsMadeInMatch(match, match.player1.id)} - {goalsMadeInMatch(match, match.player2.id)}</TableRowColumn>
                    <TableRowColumn>{playerName(match.player2.id)}</TableRowColumn>
                  </TableRow>
        )}
      </TableBody>
    </MUITable>
  )
}

export default PlayerMatches
