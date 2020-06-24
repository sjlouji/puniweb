import React, { Component } from 'react'
import {  Comment, Header } from 'semantic-ui-react'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { Divider, Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Checkbox from '@material-ui/core/Checkbox';
import { connect } from 'react-redux';
import Choice from './Choice'
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Countdown from 'react-countdown';
import { addQuizData } from '../../../store/actions/quiz'
import { viewUserQuizData } from '../../../store/actions/quiz'
import Moment from 'react-moment';
import TextFields from './TextField';

var moment = require('moment'); // require

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });



  window.$mark = 0; 
  let va =[]
  let time = 3000;

export  class Quiz extends Component {
    constructor(props){
        super(props);
        this.state={
            open: false,
            dialogOpen: false,
            setOpen: false,
            quiz_id: '',
            value: '',
            ans: [],
            mark: 0,
            totalMark: 0,
            attempt: 0,
            time: 3000,
            textChoice: '',
        }
      }

      
      componentWillMount(){
          
        console.log(this.props.prev)
        let va;
        let qui_id;
        for (let [key, value] of Object.entries(this.props.value)) {
            console.log(value)
            for (let [key, da] of Object.entries(this.props.prev)) {
                if(value.id===da.quiz_id){
                    console.log(da)
                    va = da.attempt
                }else{
                    va = 0
                }
            }
        }
        this.setState({
            attempt: va
        })
      }

      componentWillReceiveProps(nextProps){
        console.log(nextProps)
      }
      handleNameChange = mark => {
        this.setState({ mark })
        console.log(this.state.attempt)
      }
      handleDialogOpen(){
        this.setState({
            dialogOpen: true,
        })
        var offset = new Date();
        console.log(offset);
        this.timeOffSet = offset + (-2*offset);
        console.log(this.timeOffSet);
      }
      handleDialogClose(){
          this.setState({
              dialogOpen: false,
          })
      }
      uploadMark(va){
          console.log(va)
          let val;
          let passMarkval;
          let passMar;
        for (let [key, value] of Object.entries(va)) {
            console.log(value)
            val = value.attempt
            if(val>=4){
               val = 0
            }
            console.log(value)
            passMarkval=value.pass_mark
            if(typeof(passMarkval) === 'undefined'){
                passMarkval=value
            }
            passMar = value.pass_mark
            console.log(passMarkval)
            console.log(this.state.mark)
        }
        if(typeof(val) === 'undefined')
        {   
            val  =  0
        }
        if(this.state.mark>=passMarkval){
            console.log(passMarkval)
           passMarkval = true
        }
        else{
            console.log(passMarkval)
            passMarkval = false
        }
        const obtained_mark = this.state.mark 
        const quiz_id = this.state.quiz_id
        const user =  this.props.userId.id
        const attempt = val+1
        const passStatus = passMarkval
        const percentage  = (obtained_mark/passMar)*100
        const data = {
            obtained_mark,
            quiz_id,
            user,
            attempt,
            passStatus,
        };
        console.log(data)
        this.props.addQuizData(data)
      }

      handleSetAttempt(val){
          console.log(val)

      }
      handleTextFieldChange(e){
        this.setState({
            textChoice: e.target.value
        });
      }
    render() {
        const renderer = ({ hours, minutes, seconds, completed }) => {
          if (completed) {
            for (let [key, da] of Object.entries(this.props.prev)) {
                if(this.state.qui_id===da.quiz_id){
                    console.log(da)
                    va.push(da)
                }
            }
            console.log(va)
            this.uploadMark(va)
            window.location.reload()
          } else {
            return (
              <span>
                {hours}:{minutes}:{seconds}
              </span>
            );
          }
        };
        return (
            <div style={{ margin: '10px', height: '100%' }}>
                <Header as='h3' dividing>
                    Quiz
                </Header>
                <Divider style={{ width: '800px', marginTop: '20px' }}/>
                <div style={{ textAlign: 'center'}}>
                    {this.props.value?this.props.value.map((data)=>{
                        let attDet;
                        for (let [key, da] of Object.entries(this.props.prev)) {
                            if(data.id===da.quiz_id){
                                attDet = da
                            }
                        }
                        var date1 = new Date('2014-02-27T10:00:00');
                        const date = moment(attDet?attDet.attemptTime:"").add(3, 'hour').format('DD MMM YYYY HH:mm:ss');
                        var CurrentDate = moment().format('DD MMM YYYY HH:mm:ss');
                        console.log(date)
                        console.log(CurrentDate)
                        if(date>CurrentDate){
                            console.log('big')
                        }
                        else{
                            console.log('wrong')
                        }
                        return(
                            <div>
                            <Grid container spacing={3} style={{ margin: '20px', alignItems: 'center' }}>
                                <Grid item xs={6} >
                                    <Typography style={{ float: 'left' }} variant="h6" gutterBottom>
                                    {data.quiz_name}
                                    </Typography>
                                </Grid>
                                <Grid item xs={3}>
                                {attDet?(attDet.attempt<3?
                                        <div>
                                        <Typography variant="h6" gutterBottom>
                                        {attDet?(attDet.passStatus===true?
                                            `Passed with ${attDet.obtained_mark} marks`
                                            :`Failed ${attDet.obtained_mark} marks`):""}
                                        </Typography>
                                        <Typography variant="h6" gutterBottom>
                                        {attDet?(attDet.attempt===2?
                                            "(1 Attempt more)"
                                            :""):""}
                                        </Typography>
                                        <Button style={{ float: 'center' }} variant="contained" color="primary" onClick={()=>this.setState({
                                            open: true,
                                            quiz_id: data.id,
                                        })}>
                                            Take a quiz
                                        </Button>
                                        </div>
                                    : 
                                    CurrentDate>date?  
                                    <div>
                                        <Typography variant="h6" gutterBottom>
                                        {attDet?(attDet.passStatus===true?
                                            `Passed with ${attDet.obtained_mark} marks`
                                            :`Failed ${attDet.obtained_mark} marks`):""}
                                        </Typography>
                                        <Button style={{ float: 'center' }} variant="contained" color="primary" onClick={()=>this.setState({
                                        open: true,
                                        quiz_id: data.id,
                                    })}>
                                        Take a quiz
                                    </Button>
                                    </div>                         
                                    : 
                                    <div>
                                    <Typography variant="h6" gutterBottom>
                                        {attDet?(attDet.passStatus===true?
                                            `Passed with ${attDet.obtained_mark} marks`
                                        :`Failed ${attDet.obtained_mark} marks`):""}
                                        </Typography>
                                        <Button style={{ float: 'center' }} disabled variant="contained" color="primary">
                                        Take a quiz after {date}
                                    </Button>
                                    </div>                          

                                    ):
                                    <div>
                                         <Typography variant="h6" gutterBottom>
                                        {attDet?(attDet.passStatus===true?
                                           `Passed with ${attDet.obtained_mark} `
                                           :`Failed ${attDet.obtained_mark} `):""}
                                        </Typography>
                                        <Button style={{ float: 'center' }} variant="contained" color="primary" onClick={()=>this.setState({
                                        open: true,
                                        quiz_id: data.id,
                                    })}>
                                        Take a quiz
                                    </Button>
                                    </div>

                                    }
                                </Grid>
                            </Grid> 
                            </div>
                        )
                    }):
                    ""
                    }
                </div>
                {this.props.value?this.props.value.map((item)=>{
                    let val = 0;
                    if(item.id === this.state.quiz_id){
                        console.log(item)
                        for (let [key, value] of Object.entries(item.questions)) {
                            val = val +  value.mark
                        }
                        time=item.time
                        return(
                            <Dialog  fullScreen open={this.state.open} onClose={()=>this.setState({open: false})} TransitionComponent={Transition}>
                                <div style={{ marginTop: '100px', position: "fixed", top: '0px', right: '0px', height: '150px', width: '200px',  backgroundColor: '#67dc90' }}>
                                    <h2 style={{ fontWeight: '500',color: '#ffffff', top: '15%', left: '26%', position: 'absolute' }}>Score</h2>
                                    <h1 style={{ fontWeight: '500',color: '#ffffff', top: '38%', left: '26%', position: 'absolute' }}>{this.state.mark}  / {val} </h1>
                                </div>
                            <AppBar style={{ backgroundColor: '#ffffff' }}>
                                <Toolbar>
                                    <IconButton edge="start" color="primary" onClick={this.handleDialogOpen.bind(this)} aria-label="close">
                                    <CloseIcon />
                                    </IconButton>
                                    <Typography color="primary" variant="h6" >
                                    {item.quiz_name}
                                    </Typography>
                                    <Typography style={{ float: 'right', position: "fixed", top: '2%', right: '10px' }} color="primary" variant="h6" >
                                        <Countdown   date={Date.now() + item.time} renderer={renderer}/>
                                    </Typography>
                                </Toolbar>
                            </AppBar>
                            <div style={{ marginTop: '100px' }}>
                            {item.questions?item.questions.map((data, index)=>{
                                let qui_id;
                                    for (let [key, da] of Object.entries(this.props.prev)) {
                                        if(item.id===da.quiz_id){
                                            console.log(da)
                                            da['pass_mark'] = item.pass_mark
                                            va.push(da)
                                        }
                                    }
                                    if(this.props.prev.length === 0){
                                        va.push(item.pass_mark)
                                    }
                                    console.log(va)
                                    this.handleSetAttempt.bind(this,item.time)
                                    if(item.category.category==='simple'){
                                        return(
                                            <Container>
                                                <Typography variant="j6">
                                                    {index+1} .  {data.question}
                                                </Typography>
                                                <Choice value={data} sta = {this.state.mark} handleNameChange={this.handleNameChange}/>
                                            </Container>
                                        )
                                    }
                                    else if(item.category.category==='intermediate'){
                                        return(
                                            <Container style={{ marginTop:'70px' }}>
                                                <Typography variant="h6" style={{ width: "100%", marginTop: '20px' }}>
                                                    {index+1} .  {data.question}
                                                </Typography>
                                                TextField
                                                <TextFields value={data} sta = {this.state.mark} handleNameChange={this.handleNameChange}/>

                                            </Container>
                                        )
                                    }
                            }):"noting"}
                            </div>
                            <Dialog
                                open={this.state.dialogOpen}
                                onClose={this.handleDialogClose.bind(this)}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">{"Are you sure to exit the quiz?"}</DialogTitle>
                                <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                   Before exiting make sure you answerd every quiz and clicked the check progress button.  
                                </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                <Button onClick={this.handleDialogClose.bind(this)} color="primary">
                                    Cancel
                                </Button>
                                {console.log(va)}
                                <Button onClick={()=>{
                                    this.setState({
                                        handleDialogClose: false,
                                        open: false
                                    })
                                    this.uploadMark(va)
                                    window.location.reload()
                                }} color="primary" autoFocus>
                                    Agree to End the Quiz
                                </Button>
                                </DialogActions>
                            </Dialog>
                        </Dialog>
                        )
                    }
                }):
                ""
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    isUserDataAdded: state.quiz.isUserDataAdded,
    userId :  state.auth.user,
    userQuiz: state.quiz,
  });

export default connect(mapStateToProps,{addQuizData})(Quiz)