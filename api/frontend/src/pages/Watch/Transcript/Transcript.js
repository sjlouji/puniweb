import React, { Component } from 'react'
import { connect } from 'react-redux';
import store from '../../../store/configureStore';
import { Button, Comment, Form, Header } from 'semantic-ui-react'
import { Divider } from '@material-ui/core';
import { loadYData } from '../../../store/actions/youtube';

export class Transcript extends Component {

    render() {
        console.log(this.props)
        return (
            <div>
                <div style={{ margin: '10px' }}>
                <Header as='h3' dividing>
                    Transcription
                </Header>
                <Divider style={{ width: '800px', marginTop: '20px' }}/>
                </div>
                {this.props.ydata?this.props.ydata.map((item) => {
                        if(item.videoId === this.props.value){
                            if(item.transcript===""){
                                return(
                                    <div>
                                        No Transcript Available
                                    </div>                                        
                                )
                            }
                            return(
                                <div>
                                    <h3 style={{ lineHeight: '2em' }}>{item.transcript}</h3>
                                </div>
                            )
                        }
                        else{
                            return(
                                <div>
                                </div>
                            )
                        }
                }
                ):''}
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    ydata: state.youtube.ydata
  });


export default connect(mapStateToProps,{loadYData})(Transcript);
