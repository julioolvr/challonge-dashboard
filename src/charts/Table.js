import React from 'react';
import {
  Table as MUITable,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';
import Spinner from '../components/Spinner';
import {
  wonMatches,
  tiedMatches,
  lostMatches,
  matchesForPlayer,
  goalsMade,
  goalsAgainst
} from '../util/stats'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const Table = (props) => {
  if (props.data.loading) return <Spinner height="400px"/>

  const { tournament } = props.data
  return (
    <MUITable selectable={false} height={'400px'} fixedHeader={true}>
      <TableHeader
        displaySelectAll={false}
        adjustForCheckbox={false}
      >
        <TableRow>
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
        {tournament.players.map(p => {
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
          return {
            ...baseObject,
            matchesPlayed: baseObject.wonMatches + baseObject.lostMatches + baseObject.tiedMatches,
            goalsDiff: baseObject.goalsMade - baseObject.goalsAgainst,
            avgPoints: ((baseObject.wonMatches / (tournament.players.length - 1)) * 3).toFixed(2)
          }
        }).sort((a, b) => {
          if (a.wonMatches > b.wonMatches) return -1
          if (a.wonMatches < b.wonMatches) return 1
          if (b.wonMatches > a.wonMatches) return -1
          if (b.wonMatches < a.wonMatches) return 1
          return 0
        }).map(p => (
          <TableRow key={p.id}>
            <TableRowColumn>{p.name}</TableRowColumn>
            <TableRowColumn>{p.wonMatches * 3}</TableRowColumn>
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

const Query = gql`
  query Query($tournamentId: ID!) {
    tournament(id: $tournamentId) {
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
  }
`

export default graphql(Query)(Table)
