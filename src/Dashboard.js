import React, { PropTypes } from 'react'
import { GridList, GridTile } from 'material-ui/GridList'
import MaxPoints from './charts/MaxPoints'
import Table from './charts/Table'

const Dashboard = props => {
  if (!props.selectedTournament) {
    return <div style={{textAlign: 'center', marginTop: '10px'}}>Select a tournament 👆</div>
  }

  return (
    <div style={{ width: '95%', margin: '0 auto' }}>
      <Table tournamentId={props.selectedTournament} />
      <GridList cellHeight={400} style={{ marginTop: '30px' }}>
        <GridTile>
          <MaxPoints tournamentId={props.selectedTournament} />
        </GridTile>
      </GridList>
    </div>
  )
}

Dashboard.propTypes = {
  selectedTournament: PropTypes.string
}

export default Dashboard
