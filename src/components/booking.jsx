import React from 'react';
import { observer } from 'mobx-react';
import "react-datepicker/dist/react-datepicker.css";
import { Redirect } from 'react-router-dom'

import ReactJson from 'react-json-view'
 
export const Booking = observer(
   class Booking extends React.Component {
 
       constructor(props) {
           super(props);
           this.state = {
               flightNumber: '',
               customer: '',
               paymentToken: '',
               isError: false,
               redirect: false,
               restapi: ''
           };
       }

       componentDidMount () {
            console.log(this.state.flightNumber)
            // const { id } = this.props.match.params
            const { match: { params } } = this.props;

            this.setState({
                flightNumber: params.flightNumber
            })
            console.log(this.state.flightNumber)
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

       bookFlight = () => {
            console.log(this.state)

            this.setState({
                restapi: {
                    bookingOutboundFlightId: this.state.flightNumber,
                    paymentToken: this.state.paymentToken,
                    customer: this.state.customer,
                    checkedIn: false,
                    status: "CONFIRMED"
                }
            })

           /* below code goes in then of promise */
        //    this.setRedirect()
        
           /* below code goes in error of promise */
           this.setState({
                isError: true
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

            {this.state.isError && <div className="inputCard">
                <div className="uk-card uk-card-default uk-card-body error" uk-scrollspy="cls: uk-animation-slide-left; repeat: true">
                    <p>Move on to REST APIs on Serverless Architecture</p>
                    <p><ReactJson src={this.state.restapi}/></p>
                </div>
            </div>}

            </div>
            );
        }
   }
)

export default Booking
