import React from 'react';
import { observer } from 'mobx-react';
import "react-datepicker/dist/react-datepicker.css";
import { Redirect } from 'react-router-dom'
import ReactJson from 'react-json-view'
import axios from 'axios';

const API_ROOT = 'https://xoy4d878q5.execute-api.us-east-1.amazonaws.com/Prod/bookings';
// const API_ROOT = 'https://jrm15a6w41.execute-api.us-east-1.amazonaws.com/Prod/bookings';
 
export const Booking = observer(
   class Booking extends React.Component {
 
       constructor(props) {
           super(props);
           this.state = {
               flightNumber: '',
               customer: '',
               paymentToken: '',
               isSuccess: false,
               isError: false,
               redirect: false,
               allBookings: [],
               bookingsCreated: ''
           };
       }

        componentDidMount () {
            // console.log(this.state.flightNumber)
            // const { id } = this.props.match.params
            const { match: { params } } = this.props;

            this.setState({
                flightNumber: params.flightNumber
            })
            console.log(this.state.flightNumber)

            // axios GET call to get all bookings
            axios.get(API_ROOT)
                .then((response) => {
                    console.log(response.data);
                    console.log(response.data.bookings);
                    const allBookingsData = response.data.bookings;
                    
                    if (allBookingsData.length > 0) {
                        this.setState({ 
                            allBookings: allBookingsData
                            // allBookings: [...this.state.allBookings, allBookingsData] // bug on first load
                        });
                    }
            });
        }

        setRedirect = () => {
            this.setState({
                redirect: true
            })
        }

        renderRedirect = () => {
            if (this.state.redirect) {
                return <Redirect to='/search' />
            }
        }

        bookFlight = (event) => {
            console.log(this.state)
            event.preventDefault();

            const request = {
                bookingOutboundFlightId: this.state.flightNumber,
                paymentToken: this.state.paymentToken,
                customer: this.state.customer,
                checkedIn: false,
                status: "CONFIRMED"
            }
            console.log('request ' + JSON.stringify(request))

            // axios POST call to get all bookings
            axios.post(API_ROOT, request )
            .then(response => {
                console.log('response ' + response);
                console.log('response data ' + response.data);

                this.setState({
                    bookingsCreated: response.data
                })

                this.setState({ 
                    allBookings: [...this.state.allBookings, response.data]
                });

                this.setState({
                    isSuccess: true
                })
            }).catch(() => {
                /* below code goes in error of promise */
                this.setState({
                    isError: true
                })
            })
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
                        <span className="uk-label labetText"> Flight Number</span>
                        <input className="uk-input inputData uk-align-right" type="text" name='flightNumber' value={this.state.flightNumber} readOnly />
                    </div>
                </div>
            </div>
            <div className="inputCard">
                <div className="uk-card uk-card-default uk-card-body" uk-scrollspy="cls: uk-animation-slide-left; repeat: true">
                    <div>
                        <span className="uk-label labetText">Customer Name</span>
                        <input className="uk-input inputData uk-align-right" type="text" placeholder="Enter Customer Name"
                        name='customer' value={this.state.customer} onChange={e => this.handleChange(e)} />
                    </div>
                </div>
            </div>
            <div className="inputCard">
                <div className="uk-card uk-card-default uk-card-body" uk-scrollspy="cls: uk-animation-slide-left; repeat: true">
                    <div>
                        <span className="uk-label labetText">Payment Token</span>
                        <input className="uk-input inputData uk-align-right" type="text" placeholder="Enter Payment Token"
                        name='paymentToken' value={this.state.paymentToken} onChange={e => this.handleChange(e)} />
                    </div>
                </div>
            </div>

            {/* search button takes values from state and not passed from here */}
            <button className="uk-button uk-button-default uk-button-large submit-button" onClick={this.bookFlight}>Book Now</button>

            {this.renderRedirect()}

            {this.state.isSuccess && 
            <div className="inputCard">
                <div className="uk-card uk-card-default uk-card-body error" uk-scrollspy="cls: uk-animation-slide-left; repeat: true">
                    <p>Your booking is complete</p>
                    <ReactJson src={this.state.bookingsCreated}/>
                </div>
            </div>
            }
            <div className="inputCard">
                <div className="uk-card uk-card-default uk-card-body error" uk-scrollspy="cls: uk-animation-slide-left; repeat: true">
                    <p>All Bookings</p>
                    <ReactJson src={this.state.allBookings} displayObjectSize={true} collapsed/>
                </div>
            </div>

            </div>
            );
        }
   }
)

export default Booking
