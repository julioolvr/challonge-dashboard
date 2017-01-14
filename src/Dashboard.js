import React, { PropTypes } from 'react'
import { GridList, GridTile } from 'material-ui/GridList'
import MaxPoints from './charts/MaxPoints'
import Table from './charts/Table'
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
      <Table tournament={props.data.tournament} />
      <GridList cellHeight={400} style={{ marginTop: '30px' }}>
        <GridTile>
          <MaxPoints tournament={props.data.tournament} />
        </GridTile>
      </GridList>
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
