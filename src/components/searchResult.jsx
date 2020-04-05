import React from 'react';
import { observer } from 'mobx-react';
// import { API_ROOT, ENV } from '../api-config';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
 
export const FlightResult = observer(
   class FlightResult extends React.Component {
 
       constructor(props) {
           super(props);
           this.state = {
               isError: false,
               errorData: '',
               result: ''
           };
       }
 
       getAllSrci = () => {
 
           let testResult = {
               "srciId": "38e3650f-1362-4243-9514-936cc95675e6",
               "srciProfileName": "Test SRCI",
               "srciProfileDescription": "Mock SRCI profile.",
               "srciLegalName": "Test LLC",
               "srciResponseTypeCode": "PAYMENT_SRCI",
               "srciStatus": "ACTIVE",
               "srciEligibleBinRanges": [],
               "supportURI": "http://www.test.com/support",
               "supportPhoneNumber": "+19135550000",
               "supportEmailAddress": "suppport@test.com",
               "programId": "SRC",
               "createdDateTime": "2020-03-31T17:04:42.813406Z",
               "lastUpdatedDateTime": "2020-03-31T17:04:42.813773Z"
           }
 
           this.setState({
               result: testResult
           });
 
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
       }
 
       render() {
           return (
               <div className="App">
               <h3>Result</h3>
                   <Row>
                       <Col xs={12} md={6}>
                           <button className="uk-button uk-button-default uk-button-large submit-button get-all-button" onClick={this.getAllSrci}>Get All SRCI</button>
                       </Col>
                       <Col xs={12} md={6}>
                           {this.state.isError && <div className="inputCard">
                               <div className="uk-card uk-card-default uk-card-body error" uk-scrollspy="cls: uk-animation-slide-left; repeat: true">
                                   <p>There was an error fetching details for SRCI Id</p>
                                   {/* <p>{this.state.errorData}</p> */}
                               </div>
                           </div>}
                       </Col>
                   </Row>
 
                   <div className="uk-card uk-card-default uk-card-body resultTable" uk-scrollspy="cls: uk-animation-slide-left; repeat: true">
                       <div className="uk-overflow-auto">
                           <table class="uk-table uk-table-hover uk-table-divider">
                               <thead>
                                   <tr>
                                       <th className="title">SRCI ID</th>
                                       <th className="title">PROFILE NAME</th>
                                       <th className="title">PROFILE DESCRIPTION</th>
                                       <th className="title">LEGAL NAME</th>
                                       <th className="title">RESPONSE TYPE CODE</th>
                                       <th className="title">SRCI STATUS</th>
                                       <th className="title">SRCI ELIGIBILE BIN RANGE</th>
                                       <th className="title">SUPPORT URI</th>
                                       <th className="title">SUPPORT PHONE NUMBER</th>
                                       <th className="title">SUPPORT EMAIL ADDRESS</th>
                                       <th className="title">PROGRAM ID</th>
                                       <th className="title">CREATED DATE</th>
                                       <th className="title">LAST UPDATED DATE</th>
                                   </tr>
                               </thead>
                               <tbody>
                                   <tr>
                                       <td className="resultData">{this.state.result.srciId}</td>
                                       <td className="resultData">{this.state.result.srciProfileName}</td>
                                       <td className="resultData">{this.state.result.srciProfileDescription}</td>
                                       <td className="resultData">{this.state.result.srciLegalName}</td>
                                       <td className="resultData">{this.state.result.srciResponseTypeCode}</td>
                                       <td className="resultData">{this.state.result.srciStatus}</td>
                                       <td className="resultData">{this.state.result.srciEligibleBinRanges}</td>
                                       <td className="resultData">{this.state.result.supportURI}</td>
                                       <td className="resultData">{this.state.result.supportPhoneNumber}</td>
                                       <td className="resultData">{this.state.result.supportEmailAddress}</td>
                                       <td className="resultData">{this.state.result.programId}</td>
                                       <td className="resultData">{this.state.result.createdDateTime}</td>
                                       <td className="resultData">{this.state.result.lastUpdatedDateTime}</td>
                                   </tr>
                               </tbody>
                           </table>
                       </div>
                   </div>
               </div>
           );
       }
   }
)
 
export default FlightResult
