import React, {Component} from 'react';
import {  
  MDBModal,
  MDBModalHeader,
  MDBModalBody,
  MDBModalFooter,
  MDBBtn
} from 'mdbreact';

import { confirmable, createConfirmation } from 'react-confirm';

class Confirm extends Component {
  render() {
    const {
      proceedLabel,
      cancelLabel,
      title,
      confirmation,
      show,
      proceed,
      dismiss,
      cancel,
    } = this.props;
    return(
      <MDBModal name="confirmModal" isOpen={show} toggle={dismiss}>
        <MDBModalHeader>{title}</MDBModalHeader>
        <MDBModalBody>
          <h3>{confirmation}</h3>
        </MDBModalBody>
        <MDBModalFooter>
        <MDBBtn size="sm" color="primary" onClick={proceed}>{proceedLabel}</MDBBtn>
          <MDBBtn style={{boxShadow: 'none'}}
          className="text-dark btn-light" 
          size="sm" 
          onClick={cancel}>{cancelLabel}</MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    )
  }
}

export function confirm(
  confirmation,
  proceedLabel = "YES",
  cancelLabel = "NO",
  options = {}
) {
  return createConfirmation(confirmable(Confirm))({
    confirmation,
    proceedLabel,
    cancelLabel,
    ...options
  })
}