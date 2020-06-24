import React, { Component } from 'react';
import {loadYData} from '../../store/actions/youtube'; 
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';
import {Row, Col} from 'react-bootstrap'
import Moment from 'react-moment';
import Skeleton from '@material-ui/lab/Skeleton';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import NumericLabel from 'react-pretty-numbers'
import LinesEllipsis from 'react-lines-ellipsis'
import {withRouter} from 'react-router';
import TextTruncate from 'react-text-truncate'; // recommend

const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 140,
    },
  });
  
        
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
  

export class Trending extends Component {
    static propTypes = {
        loadYData: PropTypes.func.isRequired,
        ydata:  PropTypes.array,
      };

      componentDidMount(){
        this.props.loadYData()
        console.log(this.props)
      }

        
    render() {
        console.log(this.props.ydata)
        return (
          <div style={{ width:"1000px", marginLeft: this.props.DrawerStateOpen?"50px":"120px",marginTop: '50px' }}>
            <div>
              <h1>
                Trending Videos
              </h1>
              {this.props.ydata?this.props.ydata
                    .sort((a,b)=>{
                        return (a.viewCount > b.viewCount) ? 1 : -1 
                    }).reverse()
                    .slice(0,25)
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
                     "No videos found"
                     }
            </div>
          </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isLoading: state.youtube.isLoading,
    ydata: state.youtube.ydata,
  });

export default connect(mapStateToProps, {loadYData})(withRouter(Trending))