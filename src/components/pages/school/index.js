import React, { Component } from 'react';
import {connect} from 'react-redux';
import {MDBAlert, Row, Col} from 'mdbreact';
import Loader from './../../loader';
import {getTeacher} from './../../../store/actions/teacherAction';
import {getStudent} from './../../../store/actions/studentAction';
import {getClassroom} from './../../../store/actions/classroomAction';
import {getComplaintsBySchool} from './../../../store/actions/complaintAction';

class index extends Component {

  componentDidMount(){
    this.props.getTeacher(this.props.token);
    this.props.getStudent(this.props.token);
    this.props.getClassroom(this.props.token);
    this.props.getComplaintsBySchool(this.props.token);
  }

  render() {
    return (
      <div>
        <Loader show={this.props.isFetching} />
        <Row>
          <Col md="4">
            <MDBAlert className="text-center">
            <h3>Teacher</h3>
            <h1 className="font-weight-bold">{this.props.teachers.length}</h1>
            </MDBAlert>
          </Col>
          <Col md="4">
            <MDBAlert className="text-center">
            <h3>Classroom</h3>
            <h1 className="font-weight-bold">{this.props.classrooms.length}</h1>
            </MDBAlert>
          </Col>
          <Col md="4">
            <MDBAlert className="text-center">
            <h3>Student</h3>
            <h1 className="font-weight-bold">{this.props.students.length}</h1>
            </MDBAlert>
          </Col>
          <Col md="6">
            <MDBAlert color="warning" className="text-center">
            <h3>Complaints</h3>
            <h1 className="font-weight-bold">{this.props.complaints.filter(complaint => complaint.approvedDoe === true).length}</h1>
            </MDBAlert>
          </Col>
          <Col md="6">
            <MDBAlert color="success" className="text-center">
            <h3>Complaint Responded</h3>
            <h1 className="font-weight-bold">{this.props.complaints.filter(complaint => complaint.responseSchool).length}</h1>
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
    isFetching: store.complaintReducer.isFetching,
    complaints: store.complaintReducer.complaints,
    teachers: store.teacherReducer.teacher,
    students: store.studentReducer.student,
    classrooms: store.classroomReducer.classroom
  }
}

export default connect(mapStateToProps, {getComplaintsBySchool, getTeacher, getStudent, getClassroom})(index);