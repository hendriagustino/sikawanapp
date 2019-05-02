import React, { Component } from 'react'
import { MDBBtn, MDBContainer, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';

export default class index extends Component {

  render() {
    return (
      <div>
        <MDBContainer>
          <MDBModal isOpen={this.props.modal} toggle={this.props.toggle}>
            <MDBModalHeader toggle={this.props.toggle}>Edit Score</MDBModalHeader>

            <MDBModalBody>
              <form>
                <label htmlFor="date" className="grey-text">
                  Date
                </label>

                <input
                  type="date"
                  id="date"
                  className="form-control "
                />

                <label htmlFor="category" className="grey-text mt-2">
                  Category
                </label>

                <select id="category" className="form-control" >
                  <option value="assignment">assignment</option>
                  <option value="quiz">Quiz</option>
                  <option value="uts">UTS</option>
                  <option value="uas">UAS</option>
                </select>

                <label htmlFor="point" className="grey-text mt-2">
                  Point
                </label>

                <input
                  type="number"
                  id="point"
                  className="form-control"
                />
                
              </form>
            </MDBModalBody>
            
            <MDBModalFooter>
              <MDBBtn color="success">SUBMIT</MDBBtn>
              <MDBBtn color="red" onClick={this.props.toggle}>CANCEL</MDBBtn>
            </MDBModalFooter>

          </MDBModal>
        </MDBContainer>
      </div>
    );
  }
}

