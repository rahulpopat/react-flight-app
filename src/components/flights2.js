import React from 'react'

import { css } from 'glamor'
import { graphql, compose } from 'react-apollo'
import ListFlights from '../queries/ListFlights'
// import SearchFlights from '../queries/SearchFlights'

import gql from 'graphql-tag'
import debounce from 'lodash/debounce';


const SearchFlights = gql`
  query($searchQuery: String) {
      listFlights (filter: {
      departureAirportCode: {
        eq: $searchQuery
      }
    }) {
      items {
        flightNumber
        departureDate
        departureAirportCode
        arrivalAirportCode
      }
    }
  }
`

class Flights extends React.Component {
  componentWillMount(){
  }
  // state = {
  //   searchQuery: ''
  // }
  // onChange = () => {
  //   const value = 'SEA'
  //   this.handleFilter(value)
  // }
  // handleFilter = debounce((val) => {
  //   this.props.onSearch(val)
  // }, 250)
  
  render() {
    // const { items } = this.props.data.listFlights
    return (
      <div {...css(styles.container)}>
        <h1>Flights</h1>
        {
          this.props.data.listFlights.map((r, i) => (
            <div {...css(styles.flight)} key={i}>
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

export default compose(
  graphql(ListFlights, {
    options: data => ({
      fetchPolicy: 'cache-and-network'
    }),
    props: props => ({
      onSearch: searchQuery => {
        return props.data.fetchMore({
          query: searchQuery === '' ? ListFlights : SearchFlights,
          variables: {
            searchQuery
          },
          updateQuery: (previousResult, { fetchMoreResult }) => ({
            ...previousResult,
            listFlights: {
              ...previousResult.listFlights,
              items: fetchMoreResult.listFlights.items
            }
          })
        })
      },
      data: props.data
    })
  })
)(Flights)

// export default compose(
//   graphql(SearchFlights, {
//     options: {
//       fetchPolicy: 'cache-and-network'
//     },
//     props: props => ({
//       flights: props.data.listFlights ? props.data.listFlights.items : [],
//     })
//   })
// )(Flights)

const styles = {
  title: {
    fontSize: 16
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(0, 0, 0, .5)'
  },
  flight: {
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
