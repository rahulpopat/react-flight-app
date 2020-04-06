import gql from 'graphql-tag'

export default gql`
  query listFlights{
  listFlights {
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