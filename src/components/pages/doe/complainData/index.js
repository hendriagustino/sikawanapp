import React, { Component } from 'react'
import {MDBDataTable, MDBBtn, MDBAlert} from 'mdbreact';
import {connect} from 'react-redux';
import {getComplaintsByDoe, approveComplaint} from './../../../../store/actions/complaintAction';
import Loader from './../../../loader';

class index extends Component {
  
  componentDidMount() {
    this.props.getComplaintsByDoe(this.props.token);
  }

  handleSend = id => {
    this.props.approveComplaint(this.props.token, id)
  }

  render() {
    const dataTable = {
      columns: [
        {label: 'School', field: 'School'},
        {label: 'Class', field: 'class'},
        {label: 'Parent', field: 'parent'},
        {label: 'Student', field: 'student'},
        {label: 'Photo', field: 'photo'},
        {label: 'Complaint', field: 'complaint'},
        {label: 'Response', field: 'response'},
        {label: 'Status', field: 'status'},
      ],
      rows:
        this.props.complaints.map(complaint => {
          return {
            school: complaint.school ? complaint.school.fullname : '',
            class: complaint.user ? complaint.user.kelas.fullname : '',
            parent: complaint.user ? complaint.user.parent : '',
            student: complaint.user ? complaint.user.fullname : '',
            photo: complaint.image ? complaint.image.map(item => <img style={{width:'100px'}} src={item} alt={item} />) : '',
            complaint: complaint ? complaint.complaint : '',
            response: complaint.responseSchool ? complaint.responseSchool : 'no response yet',
            status: 
              complaint.approvedDoe ? 
                <MDBAlert color="success" className="m-0 font-weight-bold">SENDED TO SCHOOL</MDBAlert> : 
                <MDBBtn color="primary" block onClick={() => this.handleSend(complaint._id)}>SEND TO SCHOOL</MDBBtn>
          }
        })
    }
    return (
      <div>
        <Loader show={this.props.isFetching}/>
        <h1>Complaint List</h1>
        <MDBDataTable
          small
          striped
          bordered
          hover
          data={dataTable}
          />
      </div>
    )
  }
}

const mapStateToProps = store => {
  return {
    token: store.loginReducer.token,
    isFetching: store.complaintReducer.isFetching,
    complaints: store.complaintReducer.complaints
  }
}

export default connect(mapStateToProps, {getComplaintsByDoe, approveComplaint})(index);
