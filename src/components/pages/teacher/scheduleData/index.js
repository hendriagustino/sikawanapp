import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { MDBRow, MDBCol, MDBDataTable, MDBBtn} from 'mdbreact';
import { connect } from 'react-redux';
import moment from 'moment';
import Loader from './../../../loader';

import {getSchedulesByTeacher} from './../../../../store/actions/scheduleAction';
import {getSchedulesHistoryByTeacher} from './../../../../store/actions/scheduleAction';

class index extends Component {
  state = {
    isActiveSchedule: true
  }

  componentDidMount(){
    this.props.getSchedulesByTeacher(this.props.token);
  }

  handleChange = (e) => {
    e.preventDefault();
    if(e.target.value === "active"){
      this.setState({isActiveSchedule: true}); 
      this.props.getSchedulesByTeacher(this.props.token);
    }else{
      this.setState({isActiveSchedule: false}); 
      this.props.getSchedulesHistoryByTeacher(this.props.token);
    }
  }

  render() {

    let dataTable = {
      columns: [
        {label: 'Date', field: 'date'},
        {label: 'Start', field: 'start'},
        {label: 'End', field: 'end'},
        {label: 'Class', field: 'class'},
        {label: 'Action', field: 'action',}
      ],
      rows: 
        this.props.schedules.map(schedule => {
          return {
            day: this.state.isActiveSchedule ? schedule.day :  schedule.schedule ? moment(schedule.createdAt).format('dddd, DD MMMM YYYY') : 'Data is Empty',
            start: 
            this.state.isActiveSchedule ? schedule.startTime : schedule.schedule ? schedule.schedule.startTime : 'Data is Empty',
            end: 
            this.state.isActiveSchedule ? schedule.endTime : schedule.schedule ? schedule.schedule.endTime : 'Data is Empty',
            class: 
            this.state.isActiveSchedule ? schedule.classroom ? schedule.classroom.fullname : '' : schedule.schedule ? schedule.schedule.classroom.fullname : 'Data is Empty',
            action: 
            this.state.isActiveSchedule ? 
              <Link to={`/studentAttendance/${schedule._id}`}>
                <MDBBtn color="primary" size="sm">Attendance</MDBBtn>
              </Link> :
              <Link to={`/scheduleHistory/details?schedule=${schedule.schedule ? schedule.schedule._id : ''}&date=${moment(schedule.createdAt).format('YYYY-MM-DD')}`}>
                <MDBBtn color="primary" size="sm">Detail</MDBBtn>
              </Link>
            }
          })      
    }

    return (
      <div>
        <Loader show={this.props.isFetching} />
          <h1 className="font-weight-bold">Schedule List</h1>
          <MDBRow className="my-4">
            <MDBCol size="6">
              <select className="browser-default custom-select" onChange={this.handleChange}>     
                <option value="active">Active Schedule</option>
                <option value="history">Schedule History</option>
              </select>
            </MDBCol>
          </MDBRow>
          <MDBDataTable
            bordered
            striped
            hover
            small
            data={dataTable}
          />
      </div>
    )
  }
}

const mapStateToProps = store => {
  return {
    id: store.loginReducer.id,
    token: store.loginReducer.token,
    isFetching: store.scheduleReducer.isFetching,
    schedules: store.scheduleReducer.schedules
  }
}

export default connect(mapStateToProps, {getSchedulesByTeacher, getSchedulesHistoryByTeacher})(index);

