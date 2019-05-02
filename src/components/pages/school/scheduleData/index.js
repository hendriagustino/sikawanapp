import React, { Component } from 'react'
import { MDBBtn, MDBIcon, MDBDataTable } from "mdbreact";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getSchedules, deleteSchedule } from './../../../../store/actions/scheduleAction';
import Loader from './../../../loader';
import { confirm } from './../../../modal/Confirm';

class index extends Component {

  state = {
    addModal: false,
    editModal: false,
  }

  componentDidMount() {
    this.props.getSchedules(this.props.token);
  }

  confirmToggle = id => {
    confirm("are you sure?").then(
      () => {
        this.props.deleteSchedule(this.props.token, id)
      },
      () => {

      }
    )
  }

  render() {

    const data = {
      columns: [
        {label: 'DAY',field: 'day'},
        {label: 'START TIME',field: 'startTime'},
        {label: 'END TIME',field: 'endTime'},
        {label: 'CLASS', field: 'class'},
        {label: 'SUBJECTS', field: 'subjects'},
        {label: 'TEACHER', field: 'teacher'},
        {label: 'ACTION', field: 'action'},
      ],
      rows: this.props.schedules.map(schedule => {
        return {
          day: schedule.day ? schedule.day : 'kosong bos!',
          startTime: schedule.startTime ? schedule.startTime : 'kosong bos!',
          endTime: schedule.endTime ? schedule.endTime : 'kosong bos!',
          class: schedule.classroom ? schedule.classroom : 'kosong bos!',
          subjects: schedule.subjects ? schedule.subjects : 'kosong bos!',
          teacher: schedule.teacher ? schedule.teacher : 'kosong bos!',
          action: 
            <div>
              <MDBBtn size="sm" color="red" onClick={() => this.confirmToggle(schedule._id)}><MDBIcon icon="times" /> DELETE</MDBBtn>
            </div>

        }
      })
    }

    return (
      <div>
        <Loader show={this.props.isFetching} />
        <h1 className="font-weight-bold">Schedule List</h1>
        <Link to="/addScheduleData">
          <MDBBtn color="primary">
            <MDBIcon icon="plus" /> ADD NEW SCHEDULE
          </MDBBtn>
        </Link>

        <MDBDataTable
          small
          striped
          bordered
          hover
          data={data}
        />
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

export default connect(mapStateToProps, {getSchedules, deleteSchedule})(index);
