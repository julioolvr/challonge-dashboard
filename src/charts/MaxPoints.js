import React, { PropTypes } from 'react'
import ReactHighcharts from 'react-highcharts'

const MaxPoints = ({ tournament }) => {
  const data = tournament.participants
    .map(({ participant }) => {
      const matches = tournament.matches.filter(({ match }) => {
        return match.player1_id === participant.id || match.player2_id === participant.id
      })

      const matchesWon = matches.filter(({ match }) => match.winner_id === participant.id).length
      const matchesTied = matches.filter(({ match }) => match.state === 'complete' && !match.winner_id).length
      const matchesLeft = matches.filter(({ match }) => match.state === 'open').length

      const points = matchesWon * Number(tournament.rr_pts_for_match_win)
        + matchesTied * Number(tournament.rr_pts_for_match_tie)

      const pointsLeft = matchesLeft * Number(tournament.rr_pts_for_match_win)

      return {
        name: participant.name,
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

export default MaxPoints
