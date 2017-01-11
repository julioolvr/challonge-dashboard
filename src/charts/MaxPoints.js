import React, { PropTypes } from 'react'
import ReactHighcharts from 'react-highcharts'
import { graphql } from 'react-apollo';
import CircularProgress from 'material-ui/CircularProgress';
import gql from 'graphql-tag';

const MaxPoints = (props) => {
  if (props.data.loading) return (
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '300px'}}>
      <CircularProgress />
    </div>
  )

  const { tournament } = props.data
  const data = tournament.players
    .map((player) => {
      const matches = tournament.matches.filter((match) => {
        return match.player1.id === player.id || match.player2.id === player.id
      })

      const matchesWon = matches.filter((match) => match.score && match.score.winnerId === player.id).length
      const matchesTied = matches.filter((match) => match.played && match.score && !match.score.winnerId).length
      const matchesLeft = matches.filter((match) => !match.score).length

      const points = matchesWon * 3
        + matchesTied * 1

      const pointsLeft = matchesLeft * 3

      return {
        name: player.name,
        points,
        pointsLeft
      }
    })
    .sort((a, b) => {
      if (a.points < b.points)
        return 1

      if (a.points > b.points)
        return -1

      if (a.pointsLeft < b.pointsLeft)
        return 1

      if (a.pointsLeft > b.pointsLeft)
        return -1

      return 0
    })

  const config = {
    chart: {
      type: 'bar'
    },
    title: {
      text: 'Current points vs Max possible points'
    },
    xAxis: {
      categories: data.map(d => d.name)
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Points'
      }
    },
    legend: {
      reversed: true
    },
    plotOptions: {
      series: {
        stacking: 'normal'
      }
    },
    series: [{
      name: 'Points left',
      data: data.map(d => d.pointsLeft)
    }, {
      name: 'Points',
      data: data.map(d => d.points)
    }]
  }

  return <ReactHighcharts config={config} />
}

MaxPoints.propTypes = {
  tournament: PropTypes.object
}

const Query = gql`
  query Query($tournamentId: Int!) {
    tournament(id: $tournamentId) {
      players {
        id
        name
      }
      matches {
        player1 {
          id
          name
        }
        player2 {
          id
          name
        }
        score {
          winnerId
        }
        played
      }
    }
  }
`

export default graphql(Query)(MaxPoints)
