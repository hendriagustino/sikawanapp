import React, { Component } from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import {updateClassroom} from './../../../../../store/actions/classroomAction';
import {connect} from 'react-redux';

class index extends Component {
  state = {
    id: '',
    grade: '',
    major: '',
    classes: ''
  }

  componentDidMount(){
    this.setState({
      grade: this.props.editData.grade,
      major: this.props.editData.major,
      classes: this.props.editData.classes
    })
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = id => {
    const data = {
      grade: this.state.grade,
      major: this.state.major,
      classes: this.state.classes
    }

    this.props.updateClassroom(this.props.token, id, data);
    this.props.toggle();
  }

  render() {
    return (
      <MDBContainer>
        <MDBModal isOpen={this.props.modal} >
          <MDBModalHeader toggle={this.props.toggle}>Edit Class</MDBModalHeader>

          <MDBModalBody>
            <form>
              <label htmlFor="grade" className="grey-text">
                Grade
              </label>
              <input
                value={this.state.grade}
                type="text"
                id="grade"
                className="form-control"
                pattern="^(?!\s*$).+"
                required
                onChange={this.handleChange}
              />
              <label htmlFor="major" className="grey-text mt-2">
                Major
              </label>
              <input
                value={this.state.major}
                type="text"
                id="major"
                className="form-control"
                pattern="^(?!\s*$).+"
                required
                onChange={this.handleChange}
              />
              <label htmlFor="class" className="grey-text mt-2  ">
                Class
              </label>
              <input
                value={this.state.classes}
                type="text"
                id="classes"
                className="form-control"
                pattern="^(?!\s*$).+"
                required
                onChange={this.handleChange}
              />
            </form>
          </MDBModalBody>

          <MDBModalFooter>
            <MDBBtn size="sm" color="success" onClick={() => this.handleSubmit(this.props.editData.id)}>SUBMIT</MDBBtn>
            <MDBBtn size="sm" color="red" onClick={this.props.toggle}>CANCEL</MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </MDBContainer>
    );
  }
}

const mapStateToProps = store => {
  return {
    token: store.loginReducer.token
  }
}

export default connect(mapStateToProps, {updateClassroom})(index);

