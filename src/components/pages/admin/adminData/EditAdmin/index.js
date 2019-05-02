import React, { Component } from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';

export default class index extends Component {
  render() {
    return (
      <MDBContainer>
        <MDBModal isOpen={this.props.modal} >
          <MDBModalHeader toggle={this.props.toggle}>Edit Schedule</MDBModalHeader>

          <MDBModalBody>
            <form>
              <label htmlFor="id" className="grey-text">
                Id
              </label>
              <input
                type="text"
                id="id"
                className="form-control"
                pattern="^(?!\s*$).+"
                required
              />
              <label htmlFor="name" className="grey-text mt-2  ">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="form-control"
                pattern="^(?!\s*$).+"
                required
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
              />
            </form>
          </MDBModalBody>

          <MDBModalFooter>
            <MDBBtn size="sm" color="success">SUBMIT</MDBBtn>
            <MDBBtn size="sm" color="red" onClick={this.props.toggle}>CANCEL</MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </MDBContainer>
    );
  }
}

