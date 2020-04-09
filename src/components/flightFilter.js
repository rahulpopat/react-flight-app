import React from 'react'

import { css } from 'glamor'
import { graphql, compose } from 'react-apollo'
// import ListFlights from '../queries/ListFlights'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from 'react-router-dom';

import gql from 'graphql-tag'
import debounce from 'lodash/debounce';

const FilterFlightsQuery = gql`
  query($searchQuery: String) {
    listFlights(filter: {
      departureAirportCode: {
        contains: $searchQuery
      },
    }) {
      items {
        flightNumber
        departureDate
        departureAirportCode
        arrivalAirportCode
        ticketCurrency
      }
    }
  }
`

const ListFlights = gql`
  query {
    listFlights {
      items {
        flightNumber
        departureDate
        departureAirportCode
        arrivalAirportCode
        ticketCurrency
      }
    }
  }
`

class FilterFlights extends React.Component {
  onChange = (e) => {
    const value = e.target.value
    this.handleFilter(value)
  }
  handleFilter = debounce((val) => {
    this.props.onSearch(val)
  }, 250)

  constructor(props) {
        super(props);
        this.state = {
            searchQuery: '',
            startDate: new Date(),
            fromAirport: '',
            toAirport: 'SEA',
            result: '',
            isError: false
        };
    }

    bookFlight = (flightNumber) => {
        console.log('flight number ' + flightNumber)
    }

    submitSearch = () => {
        this.setState({
            filteredList : this.props.items? this.props.items : []
        })

        console.log('states ' + this.state);
    }

    setStartDate = (date) => {
        this.setState({
            startDate: date
        });
    }

    // common handle method for both start date and end date
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
  
  render() {
    console.log('props ' + this.props)
    const { loading } = this.props.data
    const { items } = this.props.data.listFlights || []

    return (
      
      <div {...css(styles.container)}>

        <div className="App">
            <div className="inputCard">
                <div className="uk-card uk-card-default uk-card-body" uk-scrollspy="cls: uk-animation-slide-left; repeat: true">
                    <div>
                        <span className="uk-label labetText">Departure Airport</span>
                        <input className="uk-input inputData uk-align-right" placeholder="Enter Departure Airport"
                        name='fromAirport' onChange={this.onChange.bind(this)} />
                    </div>
                </div>
            </div>
            <div className="inputCard">
                <div className="uk-card uk-card-default uk-card-body" uk-scrollspy="cls: uk-animation-slide-left; repeat: true">
                    <div>
                        <span className="uk-label labetText">Arrival Airport</span>
                        <input className="uk-input inputData uk-align-right" type="text" placeholder="Enter Arrival Airport"
                        name='toAirport' onChange={this.onChange.bind(this)} />
                    </div>
                </div>
            </div>
            <div className="inputCard">
                <div className="uk-card uk-card-default uk-card-body" uk-scrollspy="cls: uk-animation-slide-left; repeat: true">
                    <div>
                        <span className="uk-label labetText">Departure Date</span>
                        <span className="inputData uk-align-right">
                        <DatePicker selected={this.state.startDate} onChange={date => this.setStartDate(date)}
                        /></span>
                    </div>
                </div>
            </div>
            </div>

        <h1>Flights</h1>
        {
          !!loading && (
            <p>Searching...</p>
          )
        }
        {
          !loading && !items.length && (
            <p>Sorry, no results.</p>
          )
        }
        {
          !loading && items.map((item, i) => (
            <div {...css(styles.item)} key={i}>
              <p {...css(styles.title)}>Flight Number: {item.flightNumber}</p>
              <p {...css(styles.title)}>Departure Airport: {item.departureAirportCode}</p>
              <p {...css(styles.title)}>Arrival Airport: {item.arrivalAirportCode}</p>
              <p {...css(styles.title)}>Departure Date: {item.departureDate}</p>
              <Link className="uk-button uk-button-default uk-button-medium submit-button"  
                to={`/booking/${item.flightNumber}`}>Book</Link>
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
  },
}

// items: props.data.listFlights ? props.data.listFlights.items : [],

export default compose(
  graphql(ListFlights, {
    options: data => ({
      fetchPolicy: 'cache-and-network'
    }),
    props: props => ({
      onSearch: searchQuery => {
        searchQuery = searchQuery.toUpperCase()
        return props.data.fetchMore({
          query: searchQuery === '' ? ListFlights : FilterFlightsQuery,
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
)(FilterFlights);


