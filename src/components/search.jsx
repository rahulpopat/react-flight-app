import React from 'react';
import { observer } from 'mobx-react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from 'react-router-dom';
 
export const FlightSearch = observer(
   class FlightSearch extends React.Component {
 
       constructor(props) {
           super(props);
           this.state = {
               startDate: new Date(),
               fromAirport: 'EWR',
               toAirport: '',
               result: '',
               isError: false
           };
       }

       bookFlight = (flightNumber) => {
           console.log('flight number ' + flightNumber)
        //    this.props.history.push('/booking');
       }
 
       submitSearch = () => {
 
           let testResult = [{
                    "flightNumber": "100",
                    "departureAirport": "Test SRCI",
                    "arrivalAirport": "Mock SRCI profile.",
                    "departureDate": "Test LLC"
                },
                {
                    "flightNumber": "101",
                    "departureAirport": "Test SRCI",
                    "arrivalAirport": "Mock SRCI profile.",
                    "departureDate": "Test LLC"
                }
            ]

           if(this.state.fromAirport === 'EWR') {
                this.setState({
                    result: testResult,
                    isError: false
                });
           } else {
                this.setState({
                    result: '',
                    isError: true
                });
           }
 
           console.log(this.state);

           // fetch(API_ROOT, {
           //     method: 'GET',
           //     headers: {
           //         'Accept': 'application/json;charset=UTF-8',
           //         'Content-Type': 'application/json;charset=UTF-8',
           //         'program-id': 'SRC',
           //         'correlation-id': '12345'
           //     }
           // })
           // .then(res => res.json())
           // .then(
           //     (result) => {
           //         console.log(result);
           //         if(result.hasOwnProperty('errorDetail')) {
           //             this.setState({
           //                 errorData: result.errorDetail.toString(),
           //                 isError: true,
           //                 result: ''
           //             });
           //         }
           //         else {
           //             this.setState({
           //                 result: result,
           //                 isError: false
           //             });
           //         }
           //     },
           //     (error) => {
           //         this.setState({
           //             isError: true
           //         });
           //     }
           // )

           /*
           fetch(API_ROOT, {
               method: 'POST',
               headers: {
                   'Accept': 'application/json;charset=UTF-8',
                   'Content-Type': 'application/json;charset=UTF-8',
                   'program-id': 'SRC',
                   'correlation-id': '12345'
               },
               body: JSON.stringify({
                   srciProfileName: this.state.srciProfileName,
                   srciProfileDescription: this.state.srciProfileDescription,
                   srciLegalName: this.state.srciLegalName,
                   srciResponseTypeCode: this.state.srciResponseTypeCode,
                   supportURI: this.state.supportURI,
                   supportPhoneNumber: this.state.supportPhoneNumber,
                   supportEmailAddress: this.state.supportEmailAddress
                 })
           })
           .then(res => res.json())
           .then(
               (result) => {
                   console.log(result);
                   if(result.hasOwnProperty('errorDetail')) {
                       this.setState({
                           errorData: result.errorDetail.toString(),
                           isError: true
                       });
                   }
                   else {
                       this.setState({
                           result: result,
                           isError: false
                       });
                   }
               },
               (error) => {
                   this.setState({
                       isError: true
                   });
               }
           )
        */
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
            return (
            <div className="App">
            <div className="inputCard">
                <div className="uk-card uk-card-default uk-card-body" uk-scrollspy="cls: uk-animation-slide-left; repeat: true">
                    <div>
                        <span className="uk-label labetText">Departure Airport</span>
                        <input className="uk-input inputData uk-align-right" type="text" placeholder="Enter Departure Airport"
                        name='fromAirport' value={this.state.fromAirport} onChange={e => this.handleChange(e)} />
                    </div>
                </div>
            </div>
            <div className="inputCard">
                <div className="uk-card uk-card-default uk-card-body" uk-scrollspy="cls: uk-animation-slide-left; repeat: true">
                    <div>
                        <span className="uk-label labetText">Arrival Airport</span>
                        <input className="uk-input inputData uk-align-right" type="text" placeholder="Enter Arrival Airport"
                        name='toAirport' value={this.state.toAirport} onChange={e => this.handleChange(e)} />
                    </div>
                </div>
            </div>
            <div className="inputCard">
                <div className="uk-card uk-card-default uk-card-body" uk-scrollspy="cls: uk-animation-slide-left; repeat: true">
                    <div>
                        <span className="uk-label labetText">Start Date</span>
                        <span className="inputData uk-align-right">
                        <DatePicker selected={this.state.startDate} onChange={date => this.setStartDate(date)}
                        /></span>
                    </div>
                </div>
            </div>

            {/* search button takes values from state and not passed from here */}
            <button className="uk-button uk-button-default uk-button-large submit-button" onClick={this.submitSearch}>Search</button>

            {this.state.result && 
            <div>
                <div className="uk-card uk-card-default uk-card-body resultTable" uk-scrollspy="cls: uk-animation-slide-left; repeat: true">
                <div className="uk-overflow-auto">
                    <table className="uk-table uk-table-hover uk-table-divider">
                        <thead>
                            <tr>
                                <th className="title">flightNumber</th>
                                <th className="title">departureAirport</th>
                                <th className="title">arrivalAirport</th>
                                <th className="title">departureDate</th>
                                <th className="title"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.result.map(( listValue, index ) => {
                                return (
                                    <tr key={index}>
                                        <td>{listValue.flightNumber}</td>
                                        <td>{listValue.departureAirport}</td>
                                        <td>{listValue.arrivalAirport}</td>
                                        <td>{listValue.departureDate}</td>
                                        <td>
                                        {/* book button passed from here, so different syntax */}
                                        <Link className="uk-button uk-button-default uk-button-medium book-button"  
                                            to={`/booking/${listValue.flightNumber}`}>Book</Link>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                </div>
            </div>
            }

            {this.state.isError && <div className="inputCard">
                <div className="uk-card uk-card-default uk-card-body error" uk-scrollspy="cls: uk-animation-slide-left; repeat: true">
                    <p>There was an error fetching flight details</p>
                </div>
            </div>}

            </div>
            );
        }
   }
)

export default FlightSearch
