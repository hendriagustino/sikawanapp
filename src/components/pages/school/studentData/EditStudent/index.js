import React, { Component } from 'react';
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import {connect} from 'react-redux';
import {getClassroom} from './../../../../../store/actions/classroomAction';
import {editStudent} from './../../../../../store/actions/studentAction';

class index extends Component {

  state = {
    id: '',
    nisn: '',
    name: '',
    parent: '',
    classroom: '',
    email: '',
    photo: '',
    photoPath: ''
  }

  componentDidMount() {
    this.props.getClassroom(this.props.token);
    this.setState({
      id: this.props.editData.id,
      nisn: this.props.editData.nisn,
      name: this.props.editData.name,
      parent: this.props.editData.parent,
      // classroom: this.props.editData.classroom,
      email: this.props.editData.email
    })
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleImageInput = e => {
    this.setState({
      photo: e.target.files[0],
      photoPath: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault();
    let photo = new FormData()
    photo.append('fullname', this.state.name);
    photo.append('parent', this.state.parent);
    photo.append('email', this.state.email);
    this.state.classroom && photo.append('kelas', this.state.classroom);
    this.state.photo && photo.append('image', this.state.photo);
    
    this.props.editStudent(this.props.token, this.state.id, photo);
    this.props.toggle();
  }

  render() {
    return (
      <MDBContainer>
        <MDBModal isOpen={this.props.modal} >
          <MDBModalHeader toggle={this.props.toggle}>Edit Student</MDBModalHeader>

          <MDBModalBody>
            <form>
              <label htmlFor="nisn" className="grey-text">
                NISN
                </label>
              <input
                value={this.state.nisn}
                type="text"
                id="nisn"
                className="form-control"
                pattern="^(?!\s*$).+"
                required
                disabled
              />
              <label htmlFor="name" className="grey-text mt-2">
                Name
                </label>
              <input
                value={this.state.name}
                type="text"
                id="name"
                className="form-control"
                pattern="^(?!\s*$).+"
                required
                onChange={this.handleChange}
              />
              <label htmlFor="parentName" className="grey-text mt-2">
                Parent Name
                </label>
              <input
                value={this.state.parent}
                type="text"
                id="parent"
                className="form-control"
                pattern="^(?!\s*$).+"
                required
                onChange={this.handleChange}
              />
              <label htmlFor="class" className="grey-text mt-2">
                Class
                </label>
              <select
              required
              class="browser-default custom-select"
              id="classroom"
              onChange={this.handleChange}
              >
                <option>Select Classroom</option>
                {
                  this.props.classroom.map(classroom => {
                    return(
                      <option value={classroom._id}>{classroom.fullname}</option>
                    )
                  })
                }
              </select>
              <label htmlFor="email" className="grey-text mt-2">
                Email
                </label>
              <input
                value={this.state.email}
                type="email"
                id="email"
                className="form-control"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                required
                onChange={this.handleChange}
              />

              <label htmlFor="email" className="grey-text mt-2">
                Photo
              </label>
              <div className="input-group">
                <div className="custom-file">
                  <input
                    type="file"
                    className="custom-file-input"
                    id="photo"
                    aria-describedby="inputGroupFileAddon01"
                    onChange={this.handleImageInput}
                  />
                  <label className="custom-file-label" htmlFor="inputGroupFile01">
                    {this.state.photoPath || 'Choose Image'}
                  </label>
                </div>
              </div>
            </form>
          </MDBModalBody>

          <MDBModalFooter>
            <MDBBtn size="sm" color="success" onClick={this.handleSubmit}>SUBMIT</MDBBtn>
            <MDBBtn size="sm" color="red" onClick={this.props.toggle}>CANCEL</MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </MDBContainer>
    );
  }
}

const mapStateToProps = store => {
  return {
    token: store.loginReducer.token,
    classroom: store.classroomReducer.classroom
  }
}

export default connect(mapStateToProps, {getClassroom, editStudent})(index);
