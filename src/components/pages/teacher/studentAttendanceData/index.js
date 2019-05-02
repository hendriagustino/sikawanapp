import React, { Component } from 'react';
import {MDBRow, MDBCol, MDBDataTable} from 'mdbreact';
import {connect} from 'react-redux';
import {getSchedulesHistoryDetailByTeacher} from './../../../../store/actions/scheduleAction';
import Loader from './../../../loader';
import queryString from 'query-string';

class index extends Component {

  componentDidMount() {
    const query = queryString.parse(this.props.location.search);
    console.log(query.schedule)
    this.props.getSchedulesHistoryDetailByTeacher(this.props.token, query.schedule, query.date);
  }

  render() {
    let dataTable = {
      columns: [
        {label: 'NISN', field: 'nisn'},
        {label: 'Name', field: 'name'},
        {label: 'Status', field: 'status'},
      ],
      rows:
        this.props.student.map(student => {
          return{
            nisn: student.student ? student.student.nisn : '',
            name: student.student ? student.student.fullname : '',
            status: student.student ? student.description : ''
          }
        }) 
    }

    return (
      <div>
        <Loader show={this.props.isFetching} />
        <MDBRow className="mb-4">
          <MDBCol size="6">
            <div className="text-left">
              <h1 style={{textTransform: 'uppercase'}} className="font-weight-bold">{!this.props.schedule.classroom.fullname && this.props.schedule.classroom.fullname}</h1>
            </div>
          </MDBCol>
          <MDBCol size="6">
            <div className="text-right">
              <h3>{this.props.schedule.date}</h3>
              <h3>{`${this.props.schedule.startTime} - ${this.props.schedule.endTime}`}</h3>
            </div>
          </MDBCol>
        </MDBRow>
        <MDBDataTable bordered striped hover small data={dataTable}/>
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

export default connect(mapStateToProps, {getSchedulesHistoryDetailByTeacher})(index);
