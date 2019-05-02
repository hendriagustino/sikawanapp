import React, { Component } from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import { connect } from 'react-redux';
import { addAdmin } from './../../../../../store/actions/adminAdminAction';

class index extends Component {

  state = {
    // id: '',
    username: '',
    password: ''
  }

  handleAddState = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      // id: this.state.id,
      username: this.state.username,
      password: this.state.password
    }
    this.props.addAdmin(this.props.token, data);
    this.props.toggle();
  }

  render() {
    console.log(this.state)
    return (
      <MDBContainer>
        <MDBModal isOpen={this.props.modal} >
          <MDBModalHeader toggle={this.props.toggle}>Edit Schedule</MDBModalHeader>

          <MDBModalBody>
            <form>
              {/* <label htmlFor="id" className="grey-text">
                Id
              </label>
              <input
                type="text"
                id="id"
                className="form-control"
                pattern="^(?!\s*$).+"
                required
                value={this.state.id}
                onChange={this.handleAddStudent}
              /> */}
              <label htmlFor="name" className="grey-text mt-2  ">
                User Name
              </label>
              <input
                type="text"
                id="username"
                className="form-control"
                pattern="^(?!\s*$).+"
                required
                value={this.state.username}
                onChange={this.handleAddState}
              />
              <label htmlFor="password" className="grey-text mt-2  ">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="form-control"
                pattern=".{6,}"
                title="Six or more characters"
                required
                value={this.state.password}
                onChange={this.handleAddState}
              />
            </form>
          </MDBModalBody>

          <MDBModalFooter>
            <MDBBtn size="sm" color="success" type="submit" onClick={this.handleSubmit}>SUBMIT</MDBBtn>
            <MDBBtn size="sm" color="red" onClick={this.props.toggle}>CANCEL</MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </MDBContainer>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    admin: store.adminReducer.admin,
    isFetching: store.adminReducer.isFetching,
    token: store.loginReducer.token
  }
}

export default connect(
  mapStateToProps,
  { addAdmin })(index);

