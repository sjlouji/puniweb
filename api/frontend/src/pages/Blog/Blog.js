import React, { Component } from 'react'
import Toolbar from '@material-ui/core/Toolbar';
import Link from '@material-ui/core/Link';
import { Divider, Grid } from '@material-ui/core';
import {Container,Image,  Row, Col}  from 'react-bootstrap'
import Typography from '@material-ui/core/Typography';
import {loadBlog} from '../../store/actions/blog';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import Skeleton from '@material-ui/lab/Skeleton';
import Box from '@material-ui/core/Box';
import NumericLabel from 'react-pretty-numbers'
import CardMedia from '@material-ui/core/CardMedia';
import TextTruncate from 'react-text-truncate'; // recommend
import Avatar from '@material-ui/core/Avatar';
import AllStories from './AllBlog/AllStories'

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

export  class Blog extends Component {
    
    componentDidMount(){
        this.props.loadBlog()
        console.log(this.props.bdata)
      }
    render() {
        return (
        <div>
                <div>
                    {this.props.isLoading
                    ?
                    ""
                    :
                    <div style={{lineHeight: '60px', display: 'flex' , margin: '10px' }}>
                        <div style={{ marginLeft: '10px', lineHeight: '20px' }}>
                            <Typography variant="h4" gutterBottom style={{ marginBottom: '0' }}>
                            Latest Blogs 
                            </Typography>
                            <Typography variant="caption" gutterBottom>
                            Punithargal Saints
                            </Typography>                                                   
                        </div>
                    </div>
                    }
                </div>
            <Grid container direction={'row'} spacing={0}>
                {(this.props.isLoading ? Array.from(new Array(8)) : (this.props.bdata?this.props.bdata:"")).slice(0,8).map((item, index) => (
                        <Grid xs={3}  style={{ flexBasis: '24%', cursor: 'pointer', transform: this.props.DrawerStateOpen?"scale(0.90)":"" }} nopadding>
                        <Link href=""  onClick={e => this.props.history.push(`/blog/view/${item.slug}`)} style={{ textDecoration: 'none', color: 'currentcolor' }}>
                            
                            <Box key={index}  height={260} width={360} marginRight={0.5} my={5}>
                            {item ? (
                                <Box pr={2} >
                                <Typography style={{ fontWeight: '500', height: '60px' ,display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden',textOverflow:  'hidden' }} gutterBottom variant="h6">
                                    <TextTruncate
                                        line={2}
                                        element="span"
                                        truncateText="…"
                                        text={item.title}
                                    />
                                </Typography>
                                </Box>
                            ) : (
                                <div>
                                <Box pt={0.5}>
                                <Skeleton variant="rect" height={20} width="90%"  animation={false} style={{ backgroundColor: 'rgba(0, 0, 0, 0.14)', marginBottom: '10px' }}/>
                                </Box>
                                </div>
                            )}
                                {item ? (
                                <CardMedia
                                    style={{ width: "inherit", height: 200 , objectFit: 'cover' }}                                   
                                    image={item.coverImage}
                                    title={item.title}>
                                </CardMedia>
                                ) : (
                                <Skeleton variant="rect" width="inherit" height={180} animation={false} style={{ backgroundColor: 'rgba(0, 0, 0, 0.14)' }}/>
                                )}
                            </Box>
                        </Link>
                        </Grid>
                    ))}
            </Grid>
            <div>
                <AllStories value={this.props}/>
            </div>
        </div>
        )
    }
}

const mapStateToProps = (state) => ({
    bdata: state.blog.bdata,
    isLoading: state.blog.isLoading,
  });



export default connect(mapStateToProps, {loadBlog})(Blog)
