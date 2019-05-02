import React, { Component } from 'react'
import { MDBBtn, MDBContainer, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import { connect } from 'react-redux';

import { editTeacher} from './../../../../../store/actions/teacherAction';
import {getSubjects } from './../../../../../store/actions/subjectsAction';

class index extends Component {

  state = {
    id: '',
    nip: '',
    name: '',
    email: '',
    subjects: '',
    photo: '',
    photoPath: ''
  }

  componentDidMount() {
    this.setState({
      id: this.props.editData.id,
      nip: this.props.editData.nip,
      name: this.props.editData.name,
      email: this.props.editData.email,
    });
    this.props.getSubjects(this.props.token);
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }


  handleImageInput = e => {
    this.setState({
      photo: e.target.files[0],
      photoPath: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault();
    let data = new FormData()
    data.append('nip', this.state.nip);
    data.append('fullname', this.state.name);
    data.append('email', this.state.email);
    this.state.subjects && data.append('subjects', this.state.subjects);
    this.state.photo && data.append('image', this.state.photo);

    this.props.editTeacher(this.props.token, this.state.id, data);
    this.props.toggle();
  }

  render() {

    return (
      <div>
        <MDBContainer>
          <MDBModal isOpen={this.props.modal} toggle={this.props.toggle}>
            <MDBModalHeader toggle={this.props.toggle}>Edit Teacher</MDBModalHeader>

            <form onSubmit={this.handleSubmit}>
            <MDBModalBody>
                <label htmlFor="nip" className="grey-text">
                  NIP
                </label>

                <input
                  type="text"
                  id="nip"
                  pattern="^(?!\s*$).+"
                  required
                  disabled
                  className="form-control"
                  onChange={this.handleChange}
                  value={this.state.nip}
                />

                <label htmlFor="name" className="grey-text mt-2">
                  Name
                </label>

                <input
                  type="text"
                  id="name"
                  pattern="^(?!\s*$).+"
                  required
                  className="form-control"
                  onChange={this.handleChange}
                  value={this.state.name}
                />

                <label htmlFor="email" className="grey-text mt-2">
                  Email
                </label>

                <input
                  type="text"
                  id="email"
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  required
                  className="form-control"
                  onChange={this.handleChange}
                  value={this.state.email}
                />

                <label htmlFor="subjects" className="grey-text mt-2">
                  Subjects
                </label>

                <select id="subjects" className="browser-default custom-select" onChange={this.handleChange}>
                  <option>Choose your option</option>
                  {
                    this.props.subjects.map(subjects => {
                      return (
                        <option value={subjects._id}>{subjects.name}</option>
                      )
                    })
                  }
                </select>

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
              <MDBBtn size="sm" color="success" type="submit">SUBMIT</MDBBtn>
              <MDBBtn size="sm" color="red" onClick={this.props.toggle}>CANCEL</MDBBtn>
            </MDBModalFooter>
            </form>

          </MDBModal>
        </MDBContainer>
      </div>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    token: store.loginReducer.token,
    subjects: store.subjectsReducer.subjects,
    isFetching: store.teacherReducer.isFetching
  }
}

export default connect (mapStateToProps, {editTeacher, getSubjects})(index);

  