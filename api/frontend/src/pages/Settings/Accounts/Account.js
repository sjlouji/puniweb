import React, { Component } from 'react'
import { Button } from '@material-ui/core'
import { logout } from '../../../store/actions/auth'
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { Redirect } from 'react-router-dom';

export  class Account extends Component {
    render() {
        console.log(this.props.auth);
        if (!this.props.auth.isAuthenticated) {
            return <Redirect to="/account/login" />;
          }
        return (
            <div>
                <Grid container>
                    <Grid  item xs={6}>
                        Hello {this.props.auth.user?this.props.auth.user.first_name:''}
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant="contained" color="secondary" onClick={this.props.logout} style={{ float: 'right'  }}>Logout</Button>
                    </Grid>
                </Grid>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    auth: state.auth,
  });
export default connect(mapStateToProps,  { logout })(Account)
