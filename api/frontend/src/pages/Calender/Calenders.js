import React, { Component } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {loadCalenderData} from '../../store/actions/Calender';
import { connect } from 'react-redux';
import { Accordion,Card, Collapse, Row, Col } from 'react-bootstrap';

const { Panel } = Collapse;
class  Calendars extends Component {
  state = {
    date: new Date(),
  }
  componentDidMount(){
    this.props.loadCalenderData()
    console.log(this.props.cdata)
  }
  onChange = date => {this.setState({ date })}

  render() {
      function convert(str) {
          var date = new Date(str),
          mnth = ("0" + (date.getMonth() + 1)).slice(-2),
          day = ("0" + date.getDate()).slice(-2);
          return [date.getFullYear(), mnth, day].join("-");
      }
    return (
      <div>
        <Row>
          <Col xs={2}> 
              <Calendar
                onChange={this.onChange}
                value={this.state.date}
              />
          </Col>
          <Col xs={10} style={{ float: "left" }}>
                <div>
                    {this.props.cdata?this.props.cdata.map((data)=>{
                      if(convert(this.state.date) === data.startDate){
                        return(
                            <Accordion>
                              <Card>
                              <Accordion.Toggle as={Card.Header} eventKey="0">
                                {data.title}
                              </Accordion.Toggle>
                              <Accordion.Collapse eventKey="0">
                                <Card.Body>{data.description}</Card.Body>
                              </Accordion.Collapse>
                             </Card>
                            </Accordion>
                          )
                      }
                    }):""}
                </div>
          </Col>
        </Row>
       
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cdata: state.Calender.cdata,
});


export default connect(mapStateToProps, {loadCalenderData})(Calendars)
