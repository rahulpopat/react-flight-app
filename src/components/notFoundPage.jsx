import React from 'react';
import { Link } from 'react-router-dom';
import PageNotFound from '../assets/images/PageNotFound';
import { findByLabelText } from '@testing-library/react';

class NotFoundPage extends React.Component{
    render(){
        return <div>
            <img src={PageNotFound}/>
            <p>
              <Link to="/">Go Home</Link>
            </p>
          </div>;
    }
}
export default NotFoundPage;