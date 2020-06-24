import React, { Component } from 'react'
import TextTruncate from 'react-text-truncate'; // recommend
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import Box from '@material-ui/core/Box';
import CardMedia from '@material-ui/core/CardMedia';
import Moment from 'react-moment';
import { Divider, Grid } from '@material-ui/core';
import { withRouter } from 'react-router-dom'


export  class AllStories extends Component {
    render() {

        const dateToFormat = new Date('1976-04-19T12:59-0500');
        console.log(dateToFormat)
        return (
            <div>
                <div>
                    {this.props.value.isLoading
                    ?
                    ""
                    :
                    <div style={{lineHeight: '60px', display: 'flex' , margin: '10px' }}>
                        <div style={{ marginLeft: '10px', lineHeight: '20px' }}>
                            <Typography variant="h4" gutterBottom style={{ marginBottom: '0' }}>
                            All Stories 
                            </Typography>                                                
                        </div>
                    </div>
                    }
                </div>
                <Grid container direction={'column'} spacing={0}>
                    {(this.props.value.isLoading ? Array.from(new Array(8)) : (this.props.value.bdata?this.props.value.bdata:"")).map((data, index) => (
                        <Grid  style={{cursor: 'pointer'}} onClick={e => this.props.history.push(`/blog/view/${data.slug}`)}> 
                            <Divider />
                            <div style={{width: "100%", maxWidth: '1280px', margin: '0 auto',  marginTop: '23px'}}    >
                                <img src={data?data.coverImage:""} style={{ width: '150px', height: '70px', float: 'right', }}  />
                            </div>
                            <Typography variant="h5" gutterBottom>
                                
                            <Moment format="D MMM YYYY" withTitle>
                                {data?data.created_on:""}
                            </Moment>
                            </Typography>
                            <Typography variant="h6" gutterBottom>
                                {data?data.title:""}
                            </Typography>
                        </Grid>
                    ))}
            </Grid>
            </div>
        )
    }
}


export default withRouter(AllStories)