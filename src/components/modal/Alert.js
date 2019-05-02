import React, {Component} from 'react';
import {  
  MDBModal,
  MDBModalHeader,
  MDBModalBody,
  MDBModalFooter,
  MDBBtn
} from 'mdbreact';

import { confirmable, createConfirmation } from 'react-confirm';

class Alert extends Component {
  render() {
    const {
      proceedLabel,
      title,
      confirmation,
      show,
      proceed,
      dismiss,
    } = this.props;
    return(
      <MDBModal name="confirmModal" isOpen={show} toggle={dismiss}>
        <MDBModalHeader>{title}</MDBModalHeader>
        <MDBModalBody>
          <h3>{confirmation}</h3>
        </MDBModalBody>
        <MDBModalFooter>
        <MDBBtn size="sm" color="primary" onClick={proceed}>{proceedLabel}</MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    )
  }
}

export function alert(
  confirmation,
  proceedLabel = "OK",
  cancelLabel,
  options = {}
) {
  return createConfirmation(confirmable(Alert))({
    confirmation,
    proceedLabel,
    cancelLabel,
    ...options
  })
}