import React, { PropTypes } from 'react'

import MaxPoints from './charts/MaxPoints'

const Dashboard = props => {
  if (!props.tournament) {
    return <div>Select a tournament</div>
  }

  return <MaxPoints tournament={props.tournament}/>
}

Dashboard.propTypes = {
  tournament: PropTypes.object
}

export default Dashboard
