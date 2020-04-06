import React from 'react'

import { css } from 'glamor'
import { graphql, compose } from 'react-apollo'
import ListFlights from '../queries/ListFlights'

// import SearchFlights from '../queries/SearchFlights'
// import gql from 'graphql-tag'
// import debounce from 'lodash/debounce';

class Flights extends React.Component {
  componentWillMount(){
  }
  
  render() {
    console.log('propd ' + this.props)
    return (
      <div {...css(styles.container)}>
        <h1>Flights</h1>
        {
          this.props.items.map((r, i) => (
            <div {...css(styles.item)} key={i}>
              <p {...css(styles.title)}>Flight Number: {r.flightNumber}</p>
              <p {...css(styles.title)}>Departure Airport: {r.departureAirportCode}</p>
              <p {...css(styles.title)}>Arrival Airport: {r.arrivalAirportCode}</p>
              <p {...css(styles.title)}>Departure Date: {r.departureDate}</p>
            </div>
          ))
        }
      </div>
    )
  }
}

const styles = {
  title: {
    fontSize: 16
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(0, 0, 0, .5)'
  },
  item: {
    boxShadow: '2px 2px 5px rgba(0, 0, 0, .2)',
    marginBottom: 7,
    padding: 14,
    border: '1px solid #ededed'
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 100,
    paddingRight: 100,
    textAlign: 'left'
  }
}

export default compose(
  graphql(ListFlights, {
    options: {
      fetchPolicy: 'cache-and-network'
    },
    props: props => ({
      items: props.data.listFlights ? props.data.listFlights.items : [],
    })
  })
)(Flights)