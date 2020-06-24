import React, { Component } from 'react'
import {connect} from 'react-redux';
import AppBar from '../../components/AppBar/AppBar';
import {loadUser} from '../../store/actions/auth';
import PropTypes from 'prop-types';

export  class Home extends Component {

    render() {
        return (
          <div>
          <AppBar />
          </div>
        )
    }
  
}



export default  (Home);
