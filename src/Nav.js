import React from 'react'
import { Link } from 'react-router-dom'
import { css } from 'glamor'
import logo from './assets/images/logo.png';

export default class Nav extends React.Component {
  render() {
    return (
      <div {...css(styles.container)}>
        {/* <a class="navbar-brand" href="#"><img src={logo} alt="logo image" /></a> */}
          <img src={logo} alt="logo" height="50" width="70"/>
          <h1 {...css(styles.heading)}>Octank Travels</h1>
          {/* <h1 {...css(styles.heading)}>&nbsp;&nbsp;Octank Travels</h1> */}
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
    // backgroundColor: '#ff6000',
    backgroundColor: '#0068c3',
    padding: '0px 30px',
    alignItems: 'center'
  },
  heading: {
    color: 'white',
    paddingRight: 20,
    marginLeft: 20
  }
}