import React, { PropTypes } from 'react'
import { GridList, GridTile } from 'material-ui/GridList'
import MaxPoints from './charts/MaxPoints'
import Table from './charts/Table'
import PlayerMatches from './charts/PlayerMatches'
import Spinner from './components/Spinner';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const Dashboard = props => {
  if (!props.tournamentId) {
    return <div style={{textAlign: 'center', marginTop: '10px'}}>Select a tournament 👆</div>
  }
  if (props.data.loading) return <Spinner />

  return (
    <div style={{ width: '95%', margin: '0 auto' }}>
      <div style={{ display: 'inline-flex', flex: 1, flexDirection: 'row' }}>
        <div style={{flex: '3 1 60%'}}>
          <Table tournament={props.data.tournament} onPlayerSelected={props.onPlayerSelected}/>
          <GridList cellHeight={400} style={{ marginTop: '30px' }}>
            <GridTile>
              <MaxPoints tournament={props.data.tournament} />
            </GridTile>
          </GridList>
        </div>
        <div style={{flex: '1 6 20%'}}>
          {props.selectedPlayerId && <PlayerMatches playerId={props.selectedPlayerId} tournament={props.data.tournament} />}
        </div>
      </div>
    </div>
  )
}

const DashboardQuery = gql`
  query DashboardQuery($tournamentId: ID!) {
    tournament(id: $tournamentId) {
      ...Table
      ...MaxPoints
    }
  }
  ${Table.fragments.tournament}
  ${MaxPoints.fragments.tournament}
`

Dashboard.propTypes = {
  tournamentId: PropTypes.string
}

export default graphql(DashboardQuery, {
  skip: (ownProps) => !ownProps.tournamentId,
})(Dashboard)
