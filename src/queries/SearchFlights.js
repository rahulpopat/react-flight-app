import gql from 'graphql-tag'

export default gql`
  query($searchQuery) searchFlights{
  listFlights (filter: {
    departureDate: {
      ge: "2020-04-09"
      le: "2020-04-11"
    }
    departureAirportCode: {
      eq: "JFK"
    }
    arrivalAirportCode: {
      eq: "SEA"
    }
  }, limit: 10) {
    items {
      id
      flightNumber
      departureDate
      departureCity
      departureLocale
      departureAirportCode
      departureAirportName
      arrivalDate
      arrivalCity
      arrivalLocale
      arrivalAirportCode
      arrivalAirportName
      ticketPrice
      ticketCurrency
    }
    nextToken
  }
}
`