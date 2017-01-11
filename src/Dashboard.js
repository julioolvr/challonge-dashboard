import React, { PropTypes } from 'react'
import { GridList, GridTile } from 'material-ui/GridList'

import MaxPoints from './charts/MaxPoints'

const Dashboard = props => {
  if (!props.tournament) {
    return <div>Select a tournament</div>
  }

  return (
    <GridList
      cellHeight={360}>
      <GridTile>
        <MaxPoints tournament={props.tournament}/>
      </GridTile>
      <GridTile>
        <MaxPoints tournament={props.tournament}/>
      </GridTile>
      <GridTile>
        <MaxPoints tournament={props.tournament}/>
      </GridTile>
      <GridTile>
        <MaxPoints tournament={props.tournament}/>
      </GridTile>
      <GridTile>
        <MaxPoints tournament={props.tournament}/>
      </GridTile>
      <GridTile>
        <MaxPoints tournament={props.tournament}/>
      </GridTile>
    </GridList>
  )
}

Dashboard.propTypes = {
  tournament: PropTypes.object
}

export default Dashboard
