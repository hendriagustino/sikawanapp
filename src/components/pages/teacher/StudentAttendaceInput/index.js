import React, { Component } from 'react';
import {MDBRow, MDBCol, MDBBtn, MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import {connect} from 'react-redux';
import {getScheduleDetail} from './../../../../store/actions/scheduleAction';
import {addAttendance} from './../../../../store/actions/attendanceAction';
import Loader from './../../../loader';

class index extends Component {
  state = {
    status: 'active',
    attendData: []
  }

  componentDidMount() {
    this.props.getScheduleDetail(this.props.token, this.props.match.params.schedule_id);
  }

  handleChange = (e) => {
    const student = {
      schedule: this.props.match.params.schedule_id,
      student: e.target.parentNode.previousSibling.previousSibling.innerHTML,
      isAttend: e.target.value === 'attend' ? true : false,
      description: e.target.value
    }

    let newAttend = [...this.state.attendData];

    if(newAttend.findIndex(item => item.student === student.student) !== -1){
      console.log('ada yang sama!')
      newAttend.splice(newAttend.findIndex(item => item.id === student.id), 1, student)
    }else{
      console.log('input baru!')
      newAttend = [...this.state.attendData, student]
    }

    this.setState({
      attendData: newAttend
    })

    setTimeout(() => {
      console.log(this.state.attendData);
    }, 500)
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.addAttendance(this.props.token, this.state.attendData);
  }

  render() {
    return (
      <div>
        <Loader show={this.props.isFetching} />
        <MDBRow className="mb-4">
          <MDBCol size="6">
            <div className="text-left">
              <h1 className="font-weight-bold">{this.props.schedule.classroom.fullname}</h1>
            </div>
          </MDBCol>
          <MDBCol size="6">
            <div className="text-right">
              <h3>{this.props.schedule.day}</h3>
              <h3>{`${this.props.schedule.startTime} - ${this.props.schedule.endTime}`}</h3>
            </div>
          </MDBCol>
        </MDBRow>
        <form onSubmit={this.handleSubmit}>
        <MDBTable bordered striped hover small>
          <MDBTableHead>
            <tr>
              <th>Student ID</th>
              <th>Student Name</th>
              <th>Action</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {
              this.props.student.map(student => {
                return (
                  <tr key={student._id} onChange={this.handleChange}>
                    <td>{student._id}</td>
                    <td>{student.fullname}</td>
                    <td>
                      <select 
                        required
                        className="browser-default custom-select" 
                        >     
                        <option value="" disabled selected> Choose The Option </option>
                        <option value="attend">Attend</option>
                        <option value="sick">Sick</option>
                        <option value="absent">Absent</option>
                      </select>
                    </td>
                  </tr>
                )
              })
            }
          </MDBTableBody>
        </MDBTable>
        <MDBBtn type="submit" color="success">Submit</MDBBtn>
        </form>
      </div>
    )
  }
}

const mapStateToProps = store => {
  return {
    id: store.loginReducer.id,
    token: store.loginReducer.token,
    isFetching: store.scheduleReducer.isFetching,
    student: store.scheduleReducer.student,
    schedule: store.scheduleReducer.schedule
  }
}

export default connect(mapStateToProps, {getScheduleDetail, addAttendance})(index);
