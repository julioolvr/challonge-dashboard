import React, { PropTypes } from 'react'
import { GridList, GridTile } from 'material-ui/GridList'
import MaxPoints from './charts/MaxPoints'

const Dashboard = props => {
  if (!props.selectedTournament) {
    return <div style={{textAlign: 'center', marginTop: '10px'}}>Select a tournament 👆</div>
  }

  return (
    <GridList cellHeight={360}>
      <GridTile>
        <MaxPoints tournamentId={props.selectedTournament}/>
      </GridTile>
    </GridList>
  )
}

Dashboard.propTypes = {
  selectedTournament: PropTypes.int
}

export default Dashboard
