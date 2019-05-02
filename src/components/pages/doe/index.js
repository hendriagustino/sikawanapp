import React, { Component } from 'react'
import {connect} from 'react-redux';
import {MDBAlert, Row, Col} from 'mdbreact';
import Loader from './../../loader';
import {getComplaintsByDoe} from './../../../store/actions/complaintAction';

class index extends Component {

  componentDidMount(){
    this.props.getComplaintsByDoe(this.props.token);
  }

  render() {
    return (
      <div>
        <Loader show={this.props.isFetching} />
        <Row>
          <Col>
            <MDBAlert className="text-center">
            <h3>Complaints</h3>
            <h1 className="font-weight-bold">{this.props.complaints.length}</h1>
            </MDBAlert>
          </Col>
          <Col>
            <MDBAlert color="warning" className="text-center">
            <h3>Pending</h3>
            <h1 className="font-weight-bold">{this.props.complaints.filter(complaint => complaint.approvedDoe === false).length}</h1>
            </MDBAlert>
          </Col>
          <Col>
            <MDBAlert color="success" className="text-center">
            <h3>Sent to School</h3>
            <h1 className="font-weight-bold">{this.props.complaints.filter(complaint => complaint.approvedDoe === true).length}</h1>
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
    complaints: store.complaintReducer.complaints
  }
}

export default connect(mapStateToProps, {getComplaintsByDoe})(index);
