import React, { PropTypes } from 'react'
import { BarChart, XAxis, YAxis, Bar, CartesianGrid, Tooltip, Legend } from 'recharts'

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

  return <BarChart data={data} width={600} height={500} layout="vertical">
    <XAxis type="number" />
    <YAxis dataKey="name" type="category" />
    <CartesianGrid strokeDasharray="3 3"/>
    <Tooltip />
    <Legend />
    <Bar dataKey="pointsLeft" stackId="a" fill="#82ca9d" />
    <Bar dataKey="points" stackId="a" fill="#8884d8" />
  </BarChart>
}

MaxPoints.propTypes = {
  tournament: PropTypes.object
}

export default MaxPoints
