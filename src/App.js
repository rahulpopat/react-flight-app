import React from 'react';
import './App.css';
import FlightSearch from './components/search'
import Booking from './components/booking'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Router>
        <div>
            <Switch>
                <Route exact path="/">
                    <FlightSearch/>
                </Route>
                <Route path="/search">
                    <FlightSearch/>
                </Route>
                <Route path='/booking/:id' component={Booking} />
            </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
