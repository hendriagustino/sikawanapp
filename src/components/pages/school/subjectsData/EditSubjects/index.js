import React, { Component } from 'react'
import { MDBBtn, MDBContainer, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import { connect } from 'react-redux';

import {editSubjects } from './../../../../../store/actions/subjectsAction';

class index extends Component {

  state = {
    id: '',
    subjects: ''
  }

  componentDidMount() {
    this.setState({
      id: this.props.editData.id,
      subjects: this.props.editData.subjects
    });
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  render() {

    return (
      <div>
        <MDBContainer>
          <MDBModal isOpen={this.props.modal} toggle={this.props.toggle}>
            <MDBModalHeader toggle={this.props.toggle}>Edit Subjects</MDBModalHeader>

            <MDBModalBody>
              <form>

                <label htmlFor="subjects" className="grey-text">
                  SUBJECTS
                </label>

                <input
                  type="text"
                  id="subjects"
                  pattern="^(?!\s*$).+"
                  required
                  onChange={this.handleChange}
                  className="form-control"
                  value={this.state.subjects}
                />

              </form>
            </MDBModalBody>

            <MDBModalFooter>
              
              <MDBBtn size="sm" color="success" onClick={() => {
                  const data = {
                    id: this.state.id,
                    subjects: this.state.subjects 
                  }

                  this.props.editSubjects(this.props.token, data.id, data);
                  this.props.toggle();
                }

              }>SUBMIT</MDBBtn>

              <MDBBtn size="sm" color="red" onClick={this.props.toggle}>CANCEL</MDBBtn>
            </MDBModalFooter>

          </MDBModal>
        </MDBContainer>
      </div>
    )
  }
}

const mapStateToProps = (store) =>{
  return {
    token: store.loginReducer.token
  }
}

export default connect(
  mapStateToProps,
  {editSubjects})(index);
