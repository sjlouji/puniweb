import React, { Component } from 'react'
import { Form, FormControl,Button } from 'react-bootstrap';
import SearchIcon from '@material-ui/icons/Search';
import { connect } from 'react-redux';
import { searchData } from '../../store/actions/youtube';
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router-dom'

export  class Search extends Component {
  state = {
    search_query: '',
  };


  onSubmit = (e) => {
    console.log(this.props)
    this.props.history.push(`/results?search_query=${this.state.search_query}`)
    window.location.reload();
  };
  

  onChange = (e) => this.setState({ [e.target.name]: e.target.value });
  

  render() {
    const { search_query } = this.state;
    return (
      <div style={{ width: '150%'}}>
        <Form inline  style={{float: 'left'}}>
            <FormControl type="text" 
            placeholder="Search" 
            className="mr-sm-2" 
            name="search_query"
            id="search_query"
            style={{ width: '450px',  marginRight: '0px !important', marginLeft: '200px',  }} 
            onChange={this.onChange}
            value={search_query}
            onKeyPress={event => {
              if (event.key === 'Enter') {
                this.onSubmit()
              }
            }}
            />
            <Button style={{ backgroundColor: '#3f8f88' }} onClick={this.onSubmit}><SearchIcon /></Button>
         </Form>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  data: state.youtube
});

export default connect(mapStateToProps,{searchData})(withRouter(Search));
