import React, { Component } from 'react'
import {MDBAlert, Row, Col} from 'mdbreact';
import Loader from './../../loader';
import {connect} from 'react-redux';
import {getAdmin} from './../../../store/actions/adminAdminAction';
import {getDoe} from './../../../store/actions/doeAction';
import {getSchool} from './../../../store/actions/schoolAction';

class index extends Component {

  componentDidMount(){
    this.props.getAdmin(this.props.token);
    this.props.getDoe(this.props.token);
    this.props.getSchool(this.props.token);
  }

  render() {
    return (
      <div>
        <Loader show={this.props.isFetching} />
        <Row>
          <Col>
            <MDBAlert className="text-center">
            <h3>Admin</h3>
            <h1 className="font-weight-bold">{this.props.admins.length}</h1>
            </MDBAlert>
          </Col>
          <Col>
            <MDBAlert className="text-center">
            <h3>Department of Education</h3>
            <h1 className="font-weight-bold">{this.props.does.length}</h1>
            </MDBAlert>
          </Col>
          <Col>
            <MDBAlert className="text-center">
            <h3>School</h3>
            <h1 className="font-weight-bold">{this.props.schools.length}</h1>
            </MDBAlert>
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = store => {
  return {
    isFetching: store.schoolReducer.isFetching,
    token: store.loginReducer.token,
    does: store.doeReducer.doe,
    schools: store.schoolReducer.school,
    admins: store.adminReducer.admin
  }
}

export default connect(mapStateToProps, {getDoe, getSchool, getAdmin})(index);
