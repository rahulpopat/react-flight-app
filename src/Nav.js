import React from 'react'
import { Link } from 'react-router-dom'
import { css } from 'glamor'

export default class Nav extends React.Component {
  render() {
    return (
      <div {...css(styles.container)}>
        <h1 {...css(styles.heading)}>Booking Application</h1>
        {/* <Link to='/' {...css(styles.link)}></Link> */}
        <Link to='/flights' {...css(styles.link)}>Flights</Link>
        {/* <Link to='/search' {...css(styles.link)}>Search Flights</Link> */}
        <Link to='/flightFilter' {...css(styles.link)}>Search Flights</Link>
      </div>
    )
  }
}

const styles = {
  link: {
    textDecoration: 'none',
    marginLeft: 15,
    color: 'white',
    ':hover': {
      textDecoration: 'underline'
    }
  },
  container: {
    display: 'flex',
    backgroundColor: '#0068c3',
    padding: '0px 30px',
    alignItems: 'center'
  },
  heading: {
    color: 'white',
    paddingRight: 20
  }
}