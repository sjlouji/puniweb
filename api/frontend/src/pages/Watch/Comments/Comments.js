import React  from 'react'
import axios from 'axios'
import { Header } from 'semantic-ui-react'
import './Comments.css';
import Avatar from '@material-ui/core/Avatar';
import { Divider } from '@material-ui/core';

export default class Comments extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
  }

    componentDidMount(){
        axios.get(`https://www.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=1000&videoId=${this.props.value}&key=AIzaSyBqXFMg2KDNkXlhPU27w1Zcphm00su7cI0`)
        .then((response) => {
          console.log(typeof(response.data.items))
            this.setState(()=>{
              return{data: response.data.items}
            })
        })
        .catch((error) => {
            console.log(error);
        });
    }
    render() {
      console.log("this.state.data")
      console.log(this.state.data)
        return (
          <div style={{ margin: '10px' }}>
          <Header as='h3' dividing>
            {this.state.data.length}  Comments
          </Header>
          <Divider style={{ width: '800px', marginTop: '20px' }}/>
          {this.state.data.map((item)=>{
              return(
                <div style={{ marginTop: '20px' ,height: "20%", lineHeight: '100px', display: 'flex'  }}>
                <div>
                    <Avatar src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} />
                </div>
                <div>
                    <div style={{ verticalAlign: 'middle', marginLeft: '20px'}}>
                            <b><h1 style={{fontWeight: '600', fontSize: '13px'}}>{item.snippet.topLevelComment.snippet.authorDisplayName}</h1></b> 
                          <p style={{ lineHeight: 'normal' }}>
                          {item.snippet.topLevelComment.snippet.textDisplay}
                          </p>  
                    </div>                                             
                </div>

            </div>
              )
          })}
          </div>
        )
    }
}
