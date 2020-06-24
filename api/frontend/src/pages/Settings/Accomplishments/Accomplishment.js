import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper';
import {viewUserQuizData} from '../../../store/actions/quiz'
import { connect } from 'react-redux';
import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


let quiz = [];
export  class Accomplishment extends Component {
    componentWillMount(){
        this.props.viewUserQuizData()   
    }

    render() {
        return (
            <div>
                {this.props.userQuiz?this.props.userQuiz.map((data)=>{
                    let quizID = data.quiz_id
                    if(this.props.auth.id===data.user){
                            if(quizID===data.quiz_id){
                                if(data.passStatus === true){
                                    quiz[quizID] = data
                                }
                            }
                    }
                }):
                ""
                }
                {quiz?quiz.map((re)=>{
                    return(
                        <div>
                            <Card>
                                <div>
                                <CardContent >
                                    <Typography component="h5" variant="h5">
                                        {re.quiz_det.quiz_name}
                                    </Typography>
                                    <Typography variant="subtitle1" color="textSecondary">
                                       {re.quiz_det.description}
                                    </Typography>
                                    <Typography variant="subtitle1" color="textSecondary">
                                       {re.obtained_mark}
                                    </Typography>
                                </CardContent>
                                </div>
                                <CardMedia
                                    image="https://cdn1.iconfinder.com/data/icons/soleicons-fill-vol-1/64/achievements_accomplishments_conquest_medal_trophy_winner-512.png"
                                    title="Live from space album cover"
                                />
                            </Card>
                        </div>
                    )
                }):""}
            </div>
        )
    }
}


const mapStateToProps = (state) => ({
    auth : state.auth.user,
    userQuiz : state.quiz.userQuizdata,
  });
export default  connect(mapStateToProps,{viewUserQuizData})(Accomplishment)

