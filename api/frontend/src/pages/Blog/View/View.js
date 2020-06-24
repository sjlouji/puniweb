import React from 'react';
import Button from '@material-ui/core/Button';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { connect } from 'react-redux';
import {loadBlog} from '../../../store/actions/blog';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import { Divider } from '@material-ui/core';
import Moment from 'react-moment';


let view;

export class View extends React.Component {

  componentDidMount(){
    this.props.loadBlog()
    let str = this.props.location.pathname
    view  = str.split('/')[3]
  } 

    render(){
        return(
            <div>
              <div>
                  <div>
                      {this.props.bdata?this.props.bdata.map((data)=>{
                        if(data.slug === view){
                          return(
                            <div>
                              <div style={{lineHeight: '60px', display: 'flex' , margin: '10px' }}>
                                <div>
                                    <Avatar src="http://punithargal.org/images/logo-alt-1.png" />
                                </div>
                                <div style={{ marginLeft: '10px', lineHeight: '20px' }}>
                                    <Typography variant="h6" gutterBottom style={{ marginBottom: '0' }}>
                                      {data.title} 
                                    </Typography>
                                    <Typography variant="caption" gutterBottom>
                                    <Moment format="D MMM YYYY" withTitle>
                                        {data?data.created_on:""}
                                    </Moment>
                                    </Typography>                                                   
                                </div>
                              </div>
                            <Divider style={{ margin: '20px' }}/>  
                            <div style={{ marginLeft: '100px' }}>
                                <Typography variant="body1" gutterBottom style={{ marginBottom: '0', whiteSpace: 'pre-line' }}>
                                  {data.content} 
                                </Typography>
                            </div>
                            </div>
                          )
                        }
                      })
                      :""}
                  </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    bdata: state.blog.bdata
  });



export default connect(mapStateToProps, {loadBlog})(View)
