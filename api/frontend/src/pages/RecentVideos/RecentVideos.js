import React, { Component } from 'react';
import {loadYData} from '../../store/actions/youtube'; 
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import store from '../../store/configureStore';
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
import Recent from  './Recent/Recent'
import Error from '../../Error'
import { SnackbarProvider, useSnackbar } from 'notistack';
import Avatar from '@material-ui/core/Avatar';
import Link from '@material-ui/core/Link';
import { Divider } from '@material-ui/core';
import LinesEllipsis from 'react-lines-ellipsis'
import CssBaseline from '@material-ui/core/CssBaseline';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';

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



export class RecentVideos extends Component {
    static propTypes = {
        loadYData: PropTypes.func.isRequired,
        isLoading: PropTypes.bool,
        ydata:  PropTypes.array,
        loading: PropTypes.bool,
      };

      componentDidMount(){
        this.props.loadYData()
      }

      executeOnClick(isExpanded) {
        console.log(isExpanded);
      }

    render() {
        const le  = this.props.ydata
        const l2 = le?le.length:""
        const loading = this.props;
        const isOnline = window.navigator.onLine;
        const durationUrl = "";
        return (
          <React.Fragment>
          <div>{this.props.isLoading?
              ""
            :
              <div>
                  <div style={{lineHeight: '60px', display: 'flex' , margin: '10px' }}>
                      <div>
                          <Avatar src="http://punithargal.org/images/logo-alt-1.png" />
                      </div>
                      <div style={{ marginLeft: '10px', lineHeight: '20px' }}>
                          <Typography variant="h6" className="content" gutterBottom style={{ marginBottom: '0' }}>
                            Trending 
                          </Typography>
                          <Typography variant="caption" className="content" gutterBottom>
                            Punithargal Saints
                          </Typography>                                                   
                      </div>
                  </div>
                  <Divider style={{ height: '2px' }}/>
              </div>
            }

              <Grid container direction={'row'} spacing={0}>
              <CssBaseline />
                {(this.props.isLoading ? (Array.from(new Array(8))) : (this.props.ydata?this.props.ydata:"")).sort((a,b)=>{
                      return (a.viewCount > b.viewCount) ? 1 : -1 
                    }).reverse()
                    .slice(0,8)
                .map((item, index) => (
                      <Grid xs={3}  style={{ flexBasis: '24%', cursor: 'pointer', transform: this.props.DrawerStateOpen?"scale(0.90)":"" }} nopadding>
                        <Link href="" onClick={e => this.props.history.push(`/watch?v=${item.videoId}`)}  style={{ textDecoration: 'none', color: 'currentcolor' }}>
                          <Box key={index}  height={260} width={360} marginRight={0.5} my={5}>
                              {item ? (
                                <CardMedia
                                  style={{ width: "inherit", height: 200 , objectFit: 'cover' }}   
                                  image={item.thumbnailsHight}
                                  title={item.title}>
                                </CardMedia>
                              ) : (
                                <Skeleton variant="rect" width="inherit" height={180} animation={false} style={{ backgroundColor: 'rgba(0, 0, 0, 0.14)' }}/>
                              )}
                            {item ? (
                              <Box pr={2} >
                                <Typography className="content" style={{ fontWeight: '500', display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden',textOverflow:  'hidden' }} gutterBottom variant="h6">
                                  {item.title}
                                </Typography>
                                <Typography display="block" variant="body1" color="textSecondary">
                                  {item.channelTitle}
                                </Typography>
                                <Typography variant="caption" color="textSecondary">
                                    <NumericLabel params={option}>{item.viewCount}</NumericLabel> views  •   <Moment fromNow>{item.publishedAt}</Moment>
                                </Typography>
                              </Box>
                            ) : (
                              <div>
                                <Box pt={0.5}>
                                <Skeleton variant="rect" height={20} width="90%"  animation={false} style={{ backgroundColor: 'rgba(0, 0, 0, 0.14)', marginTop: '10px' }}/>
                                <Skeleton variant="rect" height={20} width="60%" animation={false} style={{ backgroundColor: 'rgba(0, 0, 0, 0.14)', marginTop: '10px' }}/>
                              </Box>
                              </div>
                            )}
                          </Box>
                        </Link>
                      </Grid>
                ))}
              </Grid>
            </div>


            <div>
              <Recent DrawerStateOpen={this.props.DrawerStateOpen}/>
            </div>

            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    isLoading: state.youtube.isLoading,
    ydata: state.youtube.ydata,
    error: state.auth.error,
  });

export default connect(mapStateToProps, {loadYData})(RecentVideos)