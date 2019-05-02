import React, { Component } from 'react';
import { 
  MDBTable,
  MDBTableBody,
  MDBTableHead,
  MDBIcon,
  MDBBtn, 
  Row,
  Col
} from 'mdbreact';
import Loader from './../../../../loader';
import { connect } from 'react-redux';
import { addSchedules } from './../../../../../store/actions/scheduleAction';
import { getClassroom } from './../../../../../store/actions/classroomAction';
import { getTeacher } from './../../../../../store/actions/teacherAction';

class index extends Component {

  state = {
    days: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
    times: ['07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'],
    schedule: [],
    classroom: '',
    day: '',
    startTime: '',
    endTime: '',
    teacher: ''
  }

  componentDidMount() {
    this.props.getClassroom(this.props.token);
    this.props.getTeacher(this.props.token);
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleAdd = e => {
    e.preventDefault();

    this.setState({
      schedule: [...this.state.schedule, {
        classroom: this.state.classroom,
        day: this.state.day,
        startTime: this.state.startTime,
        endTime: this.state.endTime,
        teacher: this.state.teacher
      }]
    })
  }

  handleDelete = i => {
    const newSchedule = [...this.state.schedule];
    newSchedule.splice(this.state.schedule.length-1-i, 1);

    this.setState({
      schedule: newSchedule
    })
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.addSchedules(this.props.token, this.state.schedule);
  }

  render() {
    return (
     <div>
       <h1 className="font-weight-bold"> ADD NEW SCHEDULE </h1>
       <Row>
          {/* FORM INPUT */}
          <Col md={4}>
            <form onSubmit={this.handleAdd} style={{
              padding: '1.5rem',
              backgroundColor: '#f8f8f8',
              borderRadius: '5px'
            }}>
              <label htmlFor="classroom" className="grey-text">
                CLASS
              </label>
              <select required id="classroom" className="browser-default custom-select" onChange={this.handleChange}>
                <option value="" disabled selected>Choose Classroom</option>
                {
                  this.props.classroom.map(item => {
                    return(
                      <option value={item._id}>{item.fullname}</option>
                    )
                  })
                }
              </select>

              <label htmlFor="day" className="grey-text mt-2">
                DAY
              </label>
              <select id="day" required className="browser-default custom-select" onChange={this.handleChange}>
                <option value="" disabled selected>Choose the Day</option>
                {this.state.days.map(day => (<option value={day}>{day}</option>))}
              </select>

              <label htmlFor="time" className="grey-text mt-2">
                Time
              </label>
              <Row>
                <Col>
                  <select id="startTime" required className="browser-default custom-select" onChange={this.handleChange}>
                    <option value="" disabled selected>Start Time</option>
                    {this.state.times.map(time => (<option value={time}>{time}</option>))}
                  </select>
                </Col>
                <span> _ </span>
                <Col>
                  <select id="endTime" required className="browser-default custom-select" onChange={this.handleChange}>
                    <option value="" disabled selected>End Time</option>
                    {this.state.times.map(time => (<option value={time}>{time}</option>))}
                  </select>
                </Col>
              </Row>

              <label htmlFor="teacher" className="grey-text mt-2">
                TEACHER
              </label>
              <select required id="teacher" className="browser-default custom-select" onChange={this.handleChange}>
                <option value="" disabled selected>Choose Teacher</option>
                {
                  this.props.teacher.map(item => {
                    return(
                      <option value={item._id}>{item.fullname}</option>
                    )
                  })
                }
              </select>

              <label htmlFor="subject" className="grey-text mt-2">
                SUBJECTS
              </label>
              <input id="subject" className="form-control" type="text" value={
                this.state.teacher &&
                  this.props.teacher[this.props.teacher.findIndex(teacher => teacher._id === this.state.teacher)].subjects.name
              } disabled />

              <MDBBtn type="submit" color="success" className="mt-3" size="sm">ADD <MDBIcon icon="angle-right"/></MDBBtn>
            </form>
            <MDBBtn color="primary" className="mt-3" size="lg" block onClick={this.handleSubmit} disabled={this.state.schedule.length <= 0 ? true : false}>SUBMIT</MDBBtn>

          </Col>
          {/* TABLE */}
          <Col md={8}>
            <MDBTable bordered striped small>
              <MDBTableHead>
                <tr>
                  <th>CLASS</th>
                  <th>DAY</th>
                  <th>START</th>
                  <th>END</th>
                  <th>TEACHER</th>
                  <th>#</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                  {  
                    this.state.schedule.length > 0 ?
                      [...this.state.schedule].reverse().map((item, i) => {
                        return(
                          <tr>
                            <td>{this.props.classroom.filter(classroom => classroom._id === item.classroom)[0].fullname}</td>
                            <td>{item.day}</td>
                            <td>{item.startTime}</td>
                            <td>{item.endTime}</td>
                            <td>
                              {`
                              ${this.props.teacher.filter(teacher => teacher._id === item.teacher)[0].fullname}
                              (${this.props.teacher.filter(teacher => teacher._id === item.teacher)[0].subjects.name})`}
                            </td>
                            <td>
                              <MDBBtn 
                              color="danger" 
                              size="sm" 
                              onClick={() => this.handleDelete(i)}>
                                <MDBIcon icon="times"/>
                              </MDBBtn>
                            </td>
                          </tr>
                        )
                      }) :
                      <tr><td colSpan="6"> no data </td></tr>
                  }
              </MDBTableBody>
            </MDBTable>
          </Col>
      <Loader show={this.props.isFetching} />
       </Row>
     </div>
    );
  }
}

const mapStateToProps = store => {
  return {
    teacher: store.teacherReducer.teacher,
    classroom: store.classroomReducer.classroom,
    isFetching: store.scheduleReducer.isFetching,
    token: store.loginReducer.token
  }
}

export default connect(
  mapStateToProps, 
  {addSchedules, getClassroom, getTeacher})(index);

