import React, { Component } from 'react';
import './App.css';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import FlightSearch from './components/search'
import Flights from './components/flights'
import Booking from './components/booking'
import FlightFilter from './components/flightFilter'

import Nav from './Nav'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Nav />
            <Switch>
              <Route exact path="/" component={FlightFilter} />
              <Route path="/flights" component={Flights} />
              <Route path="/search" component={FlightSearch} />
              <Route path="/booking/:flightNumber" component={Booking} />
              <Route path="/flightFilter" component={FlightFilter} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
