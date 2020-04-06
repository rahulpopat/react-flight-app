import gql from 'graphql-tag'

export default gql`
    query($searchQuery: String) {
      listFlights (filter: "{departureAirportCode: {eq: 'JFK'}}") {
      items {
        flightNumber
        departureDate
        departureAirportCode
        arrivalAirportCode
      }
    }
  }
`