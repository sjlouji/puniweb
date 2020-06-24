import React, { Component,useState } from 'react'
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
import { loadYData, searchData } from '../../store/actions/youtube';
import { loadQuiz } from '../../store/actions/quiz';
import LinesEllipsis from 'react-lines-ellipsis';
import {withRouter} from 'react-router';
import ReactPlayer from 'react-player'
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import axios from 'axios';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import ShowMoreText from 'react-show-more-text';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import Transcript from './Transcript/Transcript';
import Comments from './Comments/Comments';
import { payment } from '../../store/actions/payment'
import Quiz from './Quiz/Quiz'
import { viewUserQuizData } from '../../store/actions/quiz'

const option = {
    'justification': 'L',
    'locales': 'en-US',
    'currency':false,
    'percentage': false,
    'wholenumber':'ceil',
    'commafy': true,
    'cssClass': ['red'],
    'shortFormat': false,
    'title': true
    };


  
let watch;
let videoIdPresent;
let dialog;



export class Watch extends Component {
    static propTypes = {
        payment: PropTypes.func.isRequired,
      };

    constructor(){
        super();
        this.state={
            posts:[],
            buttonName:"Transcript",
            open: false,
            setOpen: false,
        }
    }

    executeOnClick(isExpanded) {
        console.log(isExpanded);
    }

    componentDidMount(){
        this.props.loadYData()
        this.props.loadQuiz()
        this.props.viewUserQuizData()
        let str = this.props.location.search
        watch  = str.split('=')[1]
        if(this.props.location.search){
            if(str.split('=')[1]){
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
        const BASE_URL = `https://www.youtube.com/watch?v=${watch}`;
        let data = ""
        function loadScript(src) {
            return new Promise((resolve) => {
                const script = document.createElement('script')
                script.src = src
                script.onload = () => {
                    resolve(true)
                }
                script.onerror = () => {
                    resolve(false)
                }
                document.body.appendChild(script)
            })
        }


        async function displayRazorpay(props) {
            const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')   
            if (!res) {
                alert('Razorpay SDK failed to load. Are you online?')
                return
            }
            const data = await fetch('http://localhost:1337/razorpay', { method: 'POST' }).then((t) =>
                t.json(),
            )
            
            const options = {
                key: 'rzp_test_qIsGhLQiOFUXFJ',
                currency: data.currency,
                amount: data.amount.toString(),
                order_id: data.id,
                name: 'Donation',
                description: 'Thank you for Donating',
                image: 'http://localhost:1337/logo.svg',
                handler: function (response) {
                    let razorpay_payment_id  = response.razorpay_payment_id
                    let razorpay_order_id  = response.razorpay_order_id
                    let razorpay_signature  = response.razorpay_signature
                    let currency  = data.currency
                    let amount =  data.amount
                    const val =  {
                        razorpay_payment_id,
                        razorpay_order_id,
                        razorpay_signature,
                        currency,
                        amount,
                    };
                    props.payment(val);
                },
                prefill: {
                    name: '',
                    email: '',
                    phone_number: ''
                }
            }
            const paymentObject = new window.Razorpay(options)
            paymentObject.open()
        }

        if(this.state.buttonName==="Transcript"){
            data  = (<Transcript value={watch}/>)
        }
        else if(this.state.buttonName==="Comments"){
            data  = (<Comments value={watch}/>)
        }
        else if(this.state.buttonName==="Quiz"){
            const pro = []; 
            const preData = [];
            for (let [key, value] of Object.entries(this.props.quiz)) {
                if(value.video_id === videoIdPresent){
                    pro.push(value)
                }
            }
            console.log(this.props)
            for (let [key, value] of Object.entries(this.props.userQuiz)) {
                if(value.user === this.props.user.id){
                    preData.push(value)
                }
            }
            data  = (<Quiz value={pro} prev={preData}/>)
        }
        else if(this.state.buttonName==="Tags"){
            data  = <h1>Tags</h1>
        }
        else if(this.state.buttonName==="Donate"){
            data  = <h1>Donate</h1>
        }
        
        return (
            <div>
            <div>
                <Row>
                    <Col xs={10}>
                        <div style={{ height: '700px' }}>
                            {this.props.data?this.props.data.map((data)=>{
                                    if(data.videoId === watch){
                                        videoIdPresent = data.id
                                        console.log(videoIdPresent)
                                        return(
                                            <ReactPlayer
                                            className='react-player'
                                            url={BASE_URL}
                                            width='100%'
                                            height='96%'
                                            controls
                                            showinfo
                                            />

                                        ) 
                                    }
                                })
                                :
                                ""
                            }
                        </div>
                        <div>
                            <div>
                                {this.props.data?this.props.data.map((data)=>{
                                    if(data.videoId === watch){
                                        return(
                                            <div>
                                                <h4 style={{ fontWeight: '500' }}>
                                                    {data.title}
                                                </h4>
                                                <p>
                                                    <NumericLabel params={option}>{data.viewCount}</NumericLabel>  Views   •    Published  <Moment format="D MMM YYYY" withTitle>{data.publishedAt}</Moment>
                                                </p>
                                                <Divider light />
                                                <div style={{ margin: '10px'}}>
                                                    <div style={{ height: "100px", lineHeight: '100px', display: 'flex'  }}>
                                                        <div>
                                                            <Avatar src="http://punithargal.org/images/logo-alt-1.png" />
                                                        </div>
                                                        <div>
                                                            <h3 style={{fontWeight: '500', verticalAlign: 'middle', marginLeft: '20px'}}>
                                                                    Punithargal Saints
                                                            </h3>                                                        
                                                        </div>
   
                                                    </div>
                                                    <p>
                                                        <ShowMoreText
                                                            /* Default options */
                                                            lines={1}
                                                            more='Show more'
                                                            less='Show less'
                                                            anchorClass=''
                                                            onClick={this.executeOnClick}
                                                            expanded={false}
                                                            width={1000}
                                                        >
                                                            {data.description}
                                                        </ShowMoreText>
                                                        
                                                    </p>
                                                </div>
                                                <Divider light />
                                                <div style={{ width: '100%', height: '80px' }}>
                                                   <Row style={{ height: '100%' }}>
                                                       <Col>
                                                            <Button style={{ width: '100%', height: '100%' }} onClick={()=>this.setState({
                                                                buttonName: 'Transcript'
                                                            })}>
                                                                Transcript
                                                            </Button>
                                                       </Col>
                                                       <Divider orientation="vertical" flexItem />
                                                       <Col>
                                                            <Button style={{ width: '100%', height: '100%' }} onClick={()=>this.setState({
                                                                buttonName: 'Comments'
                                                            })}>
                                                                Comments
                                                            </Button>                                                      
                                                       </Col>
                                                       <Divider orientation="vertical" flexItem />
                                                       <Col>
                                                            {this.props.quiz?(this.props.quiz.some(item => videoIdPresent === item.video_id)?
                                                                     <Button  style={{ width: '100%', height: '100%' }} onClick={()=>{
                                                                        if(this.props.isAuthenticated){
                                                                            this.setState({
                                                                                buttonName: 'Quiz'
                                                                            })
                                                                        }
                                                                        else{
                                                                            alert('not logged in')
                                                                            this.props.history.push(`/account/login?next=/watch?v=${watch}`);
                                                                        }
                                                                    }
                                                                    }>
                                                                        Quiz
                                                                    </Button> 
                                                            :
                                                                    <Button disabled style={{ width: '100%', height: '100%' }}>
                                                                        Quiz
                                                                    </Button>
                                                            ) 
                                                            :
                                                            ""
                                                            }
                                                       </Col>
                                                       <Divider orientation="vertical" flexItem />
                                                       <Col>
                                                            <Button style={{ width: '100%', height: '100%' }} onClick={()=>this.setState({
                                                                buttonName: 'Tags'
                                                            })}>
                                                                Tags
                                                            </Button>  
                                                       </Col>
                                                       <Divider orientation="vertical" flexItem />
                                                       <Col>
                                                            <Button  style={{ width: '100%', height: '100%'  }} onClick={()=> displayRazorpay(this.props)}>
                                                                Donate
                                                            </Button>
                                                       </Col>
                                                   </Row>
                                                </div>
                                            </div>

                                        )
                                    }
                                }):
                                ""
                                }
                                <div style={{ margin: '30px' }}>
                                    {data}
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col xs={2}>
                    </Col>
                </Row>
            </div>            
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    searchdata: state.youtube,
    user: state.auth.user,
    data: state.youtube.ydata,
    quiz: state.quiz.bdata,
    userQuiz: state.quiz.userQuizdata,
    isAuthenticated: state.auth.isAuthenticated,
  });

export default connect(mapStateToProps,{loadYData, searchData, payment, loadQuiz, viewUserQuizData })(withRouter(Watch));
