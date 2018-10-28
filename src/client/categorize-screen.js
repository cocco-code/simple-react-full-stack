import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import React, { Fragment } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Grid from '@material-ui/core/Grid';
import zIndex from '@material-ui/core/styles/zIndex';

class Layout extends React.Component{
  render(){
    return(
      <div>
        <Header></Header>
        <Footer></Footer>
      </div>
    )
  }
}

ReactDOM.render(<Layout />, document.getElementById('root'));