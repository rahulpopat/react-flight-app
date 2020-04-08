import React from 'react';
import { Link } from 'react-router-dom';
import PageNotFound from '../assets/images/PageNotFound';

class NotFoundPage extends React.Component{
    render(){
        return <div>
            <img src={PageNotFound} alt="invalid url"/>
            <p>
              <Link to="/">Go Home</Link>
            </p>
          </div>;
    }
}
export default NotFoundPage;