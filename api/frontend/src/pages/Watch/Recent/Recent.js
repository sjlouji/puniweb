import React, { Component } from 'react'
import { connect } from 'react-redux';
import {loadYData} from '../../../store/actions/youtube'; 
import  {Row,Col} from 'react-bootstrap'
import CardMedia from '@material-ui/core/CardMedia';
import { withRouter } from 'react-router-dom'

export  class Recent extends Component {

    render() {
        return (
            <div>
                <h1>Related</h1>

                <div>
                    {this.props.ydata?this.props.ydata.map((data)=>{
                            {console.log(this.props)}
                        return(
                            <div style={{ cursor: 'pointer' }} onClick={e => this.props.history.push(`/watch?v=${data.videoId}`)}>
                                <Row xs={12} >
                                    <Col xs={3}>
                                        <div style={{ width: '260px', height: '200px' }}>
                                            <CardMedia
                                            component="img"
                                            alt="Contemplative Reptile"
                                            height="140"
                                            image={data.thumbnailsHight}
                                            title="Contemplative Reptile"
                                            />
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        )
                    })
                    :
                    "No videos  found"}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isLoading: state.youtube.isLoading,
    ydata: state.youtube.ydata,
  });

export default withRouter(connect(mapStateToProps, {loadYData})(Recent))
