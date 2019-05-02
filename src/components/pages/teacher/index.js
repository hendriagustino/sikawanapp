import React, { Component } from 'react';
import {connect} from 'react-redux';
import {MDBAlert, Row, Col} from 'mdbreact';
import Loader from './../../loader';
import {getSchedulesByTeacher} from './../../../store/actions/scheduleAction';
import moment from 'moment';

class index extends Component {

  componentDidMount(){
    this.props.getSchedulesByTeacher(this.props.token);
  }

  render() {
    return (
      <div>
        <Loader show={this.props.isFetching} />
        <Row>
          <Col md="8">
            <MDBAlert>
            <h3>Your Today's Schedule</h3>
            {
              this.props.schedules
                .filter(schedule => schedule.day === moment().format('dddd').toLowerCase())
                .map(schedule => {
                  return (
                    <div>
                      <h1 className="font-weight-bold d-inline-block mr-3">{schedule.classroom ? schedule.classroom.fullname.toUpperCase() : ''}</h1>
                      <h4 className="d-inline-block">at {schedule.startTime} until {schedule.endTime}</h4>
                    </div>
                  )
                })
            }
            </MDBAlert>
          </Col>
          <Col md="4">
            <MDBAlert color="dark" className="text-center">
            <h3>Your Total Schedules This Week</h3>
            <h1 className="font-weight-bold">{this.props.schedules.length}</h1>
            </MDBAlert>
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = store => {
  return {
    token: store.loginReducer.token,
    isFetching: store.scheduleReducer.isFetching,
    schedules: store.scheduleReducer.schedules
  }
}

export default connect(mapStateToProps, {getSchedulesByTeacher})(index);