import React, { Component } from 'react'
import { MDBContainer, MDBBtn, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import {connect} from 'react-redux';
import { getClassroom } from './../../../../../store/actions/classroomAction';
import { addStudent } from './../../../../../store/actions/studentAction';


class index extends Component {

  state = {
    nisn: '',
    name: '',
    parent: '',
    class: '',
    email: '',
    photo: '',
    photoPath: ''
  }

  componentDidMount(){
    this.props.getClassroom(this.props.token);
  }
  
  handleAddStudent = e => {
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
    photo.append('nisn', this.state.nisn);
    photo.append('fullname', this.state.name);
    photo.append('parent', this.state.parent);
    photo.append('kelas', this.state.class);
    photo.append('email', this.state.email);
    photo.append('image', this.state.photo);

    this.props.addStudent(this.props.token, photo);
    this.props.toggle();
  }

  render() {
    return (
      <div>
        <MDBContainer>
          <MDBModal isOpen={this.props.modal} >
            <MDBModalHeader toggle={this.props.toggle}>Add New Student</MDBModalHeader>

            <form onSubmit={this.handleSubmit}>
            <MDBModalBody>
                <label htmlFor="nisn" className="grey-text">
                  NISN
                </label>
                <input
                  type="text"
                  id="nisn"
                  className="form-control"
                  pattern="^(?!\s*$).+"
                  required
                  value={this.state.nisn}
                  onChange={this.handleAddStudent}
                />
                <label htmlFor="name" className="grey-text mt-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="form-control"
                  pattern="^(?!\s*$).+"
                  required
                  value={this.state.name}
                  onChange={this.handleAddStudent}
                />
                <label htmlFor="parentName" className="grey-text mt-2">
                  Parent Name
                </label>
                <input
                  type="text"
                  id="parentName"
                  className="form-control"
                  pattern="^(?!\s*$).+"
                  required
                  value={this.state.parentName}
                  onChange={this.handleAddStudent}
                />
                <label htmlFor="class" className="grey-text mt-2">
                  Class
                </label>
                <select 
                id="class"
                required
                className="browser-default custom-select"
                value={this.state.class}
                onChange={this.handleAddStudent}
                >
                  <option disabled selected>Open this select menu</option>
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
                  type="email"
                  id="email"
                  className="form-control"
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  required
                  value={this.state.email}
                  onChange={this.handleAddStudent}
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
            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn size="sm" type="submit" color="success">SUBMIT</MDBBtn>
              <MDBBtn size="sm" color="red" onClick={this.props.toggle}>CANCEL</MDBBtn>
            </MDBModalFooter>
            </form>

          </MDBModal>
        </MDBContainer>
      </div>
    )
  }
}

const mapStateToProps = store => {
  return{
    id: store.loginReducer.id,
    token: store.loginReducer.token,
    classroom: store.classroomReducer.classroom
  }
}

export default connect(
  mapStateToProps, {getClassroom, addStudent})(index);

