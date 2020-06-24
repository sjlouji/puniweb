import React, { useState, useEffect, Component } from 'react';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Moment from 'react-moment';
import Skeleton from '@material-ui/lab/Skeleton';
import NumericLabel from 'react-pretty-numbers'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {Row, Col} from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { searchData } from '../../store/actions/youtube';
import LinesEllipsis from 'react-lines-ellipsis'
import {withRouter} from 'react-router';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import { Container, Divider } from '@material-ui/core';
import TextTruncate from 'react-text-truncate'; // recommend
import InfiniteScroll from "react-infinite-scroller";

const option = {
    'justification': 'L',
    'locales': 'en-US',
    'currency':false,
    'percentage': false,
    'wholenumber':'ceil',
    'commafy': true,
    'cssClass': ['red'],
    'shortFormat': true,
    'shortFormatMinValue': 10000,
    'title': true
    };
    const style = {
        height: 30,
        border: "1px solid green",
        margin: 6,
        padding: 8
      };



export class List extends Component {
    state = {
        items: Array.from({ length: 20 })
      };
      fetchMoreData = () => {
        // a fake async api call like which sends
        // 20 more records in 1.5 secs
        setTimeout(() => {
          this.setState({
            items: this.state.items.concat(Array.from({ length: 20 }))
          });
        }, 1500);
      };
    constructor(props){
        super(props);
    }
    componentDidMount(){
        let str = this.props.location.search
        if(this.props.location.search){
            if(str.split('=')[1]){
                console.log("hey louji")
                this.props.searchData(str.split('=')[1])  
            } else{
                this.props.history.push("/");
            } 
        }
        else if(!this.props.location.search){
            this.props.history.push("/");
        }
    }

    render() {

        return (
         <div style={{ width:"1000px", marginLeft: this.props.DrawerStateOpen?"50px":"120px",marginTop: '50px' }}>
             <Typography variant="body1" style={{ margin: '10px', color: 'currentColor', textDecoration: '' }}>
                 Search for the term <a href="#">{this.props.location.search.split('=')[1]}</a> : {this.props.searchdata.ysearchdata ? this.props.searchdata.ysearchdata.length:""}  result found
             </Typography>
             <Divider style={{  }}/>

            {this.props.searchdata.ysearchdata ? this.props.searchdata.ysearchdata
                .map((data)=>(
                    <Grid container style={{  marginTop: '20px ', cursor: 'pointer' }} onClick={e => this.props.history.push(`/watch?v=${data.videoId}`)}> 
                        <Grid item  xs={3.8}>
                            <div style={{ width: '260px', height: 'fit-content' }}>
                                <CardMedia
                                component="img"
                                alt={data.title}
                                height="140"
                                image={data.thumbnailsHight}
                                title="Contemplative Reptile"
                                />
                            </div>
                        </Grid>
                        <Grid item  xs={8} style={{ marginLeft: '18px' }}>
                            <CardContent  style={{ padding: '0' }}>
                                <Typography gutterBottom variant="h6" component="h5">
                                    {data.title}
                                </Typography>
                                <Typography gutterBottom variant="caption" component="body1" style={{ textOverflow:  'ellipsis', overflow: 'hidden' }}>
                                    <TextTruncate
                                        line={2}
                                        element="span"
                                        truncateText="…"
                                        text={data.description}
                                    />
                                </Typography>
                                <Grid container>
                                    <Grid style={{ marginTop: '20px' }}>
                                        <Row xs={3}>
                                            <Col xs={1}>
                                                <Typography variant="body2" color="textSecondary" component="p">
                                                    <NumericLabel params={option}>{data.viewCount}</NumericLabel> 
                                                </Typography>
                                            </Col>
                                            <Col xs={2}>
                                                <Typography variant="body2" color="textSecondary" component="p">
                                                    views
                                                </Typography>
                                            </Col>
                                        </Row>
                                    </Grid>
                                    <Grid  style={{ marginTop: '20px' }}>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            Published  <Moment fromNow>{data.publishedAt}</Moment>
                                        </Typography>
                                    </Grid>
                                </Grid>
                        </CardContent>          
                        </Grid>
                    </Grid>
                )):
                <CircularProgress />
            }
         </div>
        )
    }
}

const mapStateToProps = (state) => ({
    searchdata: state.youtube
  });

export default connect(mapStateToProps,{searchData})(withRouter(List));
