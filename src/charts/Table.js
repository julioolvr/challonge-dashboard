import React from 'react';
import {
  Table as MUITable,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';
import {
  wonMatches,
  tiedMatches,
  lostMatches,
  matchesForPlayer,
  goalsMade,
  goalsAgainst
} from '../util/stats'
import gql from 'graphql-tag';


const completedPlayer = (tournament) => tournament.players.map(p => {
    const matches = matchesForPlayer(p.id, tournament)
    const baseObject = {
      ...p,
      matches,
      wonMatches: wonMatches(p.id, matches).length,
      lostMatches: lostMatches(p.id, matches).length,
      tiedMatches: tiedMatches(matches).length,
      goalsMade: goalsMade(p.id, matches),
      goalsAgainst: goalsAgainst(p.id, matches),
    }
    const points = baseObject.wonMatches * 3 + baseObject.tiedMatches
    const matchesPlayed = baseObject.wonMatches + baseObject.lostMatches + baseObject.tiedMatches

    return {
      ...baseObject,
      matchesPlayed,
      points,
      goalsDiff: baseObject.goalsMade - baseObject.goalsAgainst,
      avgPoints: (points / matchesPlayed).toFixed(2)
    }
  }).sort((a, b) => {
    if(b.points !== a.points)
      return b.points - a.points
    return b.goalsDiff - a.goalsDiff
  })
  .map( (p, index) => ({...p, position: index + 1 }))

const Table = (props) => {
  const { tournament } = props
  const players = completedPlayer(tournament)

  const onPlayerSelected = (indexes) => props.onPlayerSelected(typeof(indexes[0]) !== 'undefined' && players[indexes[0]].id)

  return (
    <MUITable selectable={true} height={'400px'} fixedHeader={true} onRowSelection={onPlayerSelected}>
      <TableHeader
        displaySelectAll={false}
        adjustForCheckbox={false}
      >
        <TableRow>
          <TableHeaderColumn>#</TableHeaderColumn>
          <TableHeaderColumn>Jugador</TableHeaderColumn>
          <TableHeaderColumn>PTS</TableHeaderColumn>
          <TableHeaderColumn>PJ</TableHeaderColumn>
          <TableHeaderColumn>G</TableHeaderColumn>
          <TableHeaderColumn>E</TableHeaderColumn>
          <TableHeaderColumn>P</TableHeaderColumn>
          <TableHeaderColumn>GF</TableHeaderColumn>
          <TableHeaderColumn>GC</TableHeaderColumn>
          <TableHeaderColumn>DG</TableHeaderColumn>
          <TableHeaderColumn>Prom</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody displayRowCheckbox={false} stripedRows={true}>
        {players.map(p => (
          <TableRow key={p.id} style={{cursor:'pointer'}}>
            <TableRowColumn>{p.position}</TableRowColumn>
            <TableRowColumn>{p.name}</TableRowColumn>
            <TableRowColumn>{p.points}</TableRowColumn>
            <TableRowColumn>{p.matchesPlayed}</TableRowColumn>
            <TableRowColumn>{p.wonMatches}</TableRowColumn>
            <TableRowColumn>{p.tiedMatches}</TableRowColumn>
            <TableRowColumn>{p.lostMatches}</TableRowColumn>
            <TableRowColumn>{p.goalsMade}</TableRowColumn>
            <TableRowColumn>{p.goalsAgainst}</TableRowColumn>
            <TableRowColumn>{p.goalsDiff}</TableRowColumn>
            <TableRowColumn>{p.avgPoints}</TableRowColumn>
          </TableRow>
        ))}
      </TableBody>
    </MUITable>
  )
}

Table.fragments = {
  tournament: gql`
    fragment Table on Tournament {
      players {
        id
        name
      }
      matches {
        player1 {
          id
        }
        player2 {
          id
        }
        score {
          players {
            player {
              name,
              id
            }
            score
          }
          winnerId
        }
        played
      }
    }
  `
}

export default Table
