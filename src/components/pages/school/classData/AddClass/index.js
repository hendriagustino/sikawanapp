import React, { Component } from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import { connect } from 'react-redux';
import { addClassroom, getClassroom } from './../../../../../store/actions/classroomAction';

class index extends Component {

  state = {
    grade: '',
    major: '',
    classes: ''
  }

  handleAddState = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      grade: this.state.grade,
      major: this.state.major,
      classes: this.state.classes
    }
    this.props.addClassroom(this.props.token, data);
    this.props.toggle();
  }

  render() {
    console.log(this.state)
    return (
      <MDBContainer>
        <MDBModal isOpen={this.props.modal} >
          <MDBModalHeader toggle={this.props.toggle}>Add New Class</MDBModalHeader>

          <MDBModalBody>
            <form>
              <label htmlFor="grade" className="grey-text">
                Grade
              </label>
              <input
                type="text"
                id="grade"
                className="form-control"
                pattern="^(?!\s*$).+"
                required
                value={this.state.grade}
                onChange={this.handleAddState}
              />
              <label htmlFor="major" className="grey-text mt-2">
                Major
              </label>
              <input
                type="text"
                id="major"
                className="form-control"
                pattern="^(?!\s*$).+"
                required
                value={this.state.major}
                onChange={this.handleAddState}
              />
              <label htmlFor="class" className="grey-text mt-2  ">
                Class
              </label>
              <input
                type="text"
                id="classes"
                className="form-control"
                pattern="^(?!\s*$).+"
                required
                value={this.state.classes}
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
    classroom: store.classroomReducer.classroom,
    isFetching: store.classroomReducer.isFetching,
    token: store.loginReducer.token
  }
}

export default connect(
  mapStateToProps,
  { addClassroom, getClassroom })(index);

