import React, { Component } from 'react';
import { MDBBtn, MDBIcon, MDBDataTable } from 'mdbreact';
import AddTeacher from './AddTeacher';
import EditTeacher from './EditTeacher';
import { connect } from 'react-redux';

import { confirm } from './../../../modal/Confirm';
import { getTeacher, addTeacher, deleteTeacher } from './../../../../store/actions/teacherAction';
import Loader from './../../../loader';

class index extends Component {

  state = {
    addModal: false,
    editModal: false,
    editData: {
      id: '',
      nip: '',
      name: '',
      email: '',
      subjects: ''
    }
  }

  componentDidMount() {
    this.props.getTeacher(this.props.token);
  }

  editToggle = (id, nip, name, email, subjects) => {
    this.setState({
      editModal: !this.state.editModal,
      editData: {
        id: id,
        nip: nip,
        name: name,
        email: email,
        subjects: subjects
      }
    });
  }

  addToggle = () => {
    this.setState({
      addModal: !this.state.addModal
    });
  }

  confirmToggle = (id) => {
    confirm("Are you sure?").then(
      () => {
        this.props.deleteTeacher(this.props.token, id);
      },
      () => {
      }
    )
  }

  render() {

    const data = {
      columns: [
        {
          label: 'Photo',
          field: 'photo'
        },
        {
          label: 'NIP',
          field: 'nip'
        },
        {
          label: 'NAME',
          field: 'name'
        },
        {
          label: 'EMAIL',
          field: 'email'
        },
        {
          label: 'SUBJECTS',
          field: 'subjects'
        },
        {
          label: 'ACTION',
          field: 'action'
        }
      ],
      rows: this.props.teacher.map(teacher => {
        return {
          photo: <img style={{width: '150px'}} src={teacher.image ? teacher.image : 'https://via.placeholder.com/150'} alt={teacher._id}/> ,
          nip: teacher.nip ? teacher.nip : '',
          name: teacher.fullname ? teacher.fullname : '',
          email: teacher.email ? teacher.email : '',
          subjects: teacher.subjects ? teacher.subjects.name : '',
          action:
            <React.Fragment>
              <MDBBtn size="sm" color="success" onClick={() => this.editToggle(teacher._id, teacher.nip, teacher.fullname, teacher.email, teacher.subjects)} toggle={this.editToggle} >
                <MDBIcon icon="edit" /> EDIT</MDBBtn>

              <MDBBtn size="sm" color="red" onClick={() => this.confirmToggle(teacher._id)}>
                <MDBIcon icon="times" /> DELETE
              </MDBBtn>
            </React.Fragment>
        }
      })
    }

    return (
      <div>
        <Loader show={this.props.isFetching} />
        <h1 className="font-weight-bold">Teachers List</h1>
        <MDBBtn color="primary" onClick={this.addToggle}>
          <MDBIcon icon="plus" /> ADD
        </MDBBtn>

        <MDBDataTable
          small
          striped
          bordered
          hover
          data={data}
        />

        <AddTeacher modal={this.state.addModal} toggle={this.addToggle} addTeacher={this.addTeacher} />

        {
          this.state.editModal &&
          <EditTeacher modal={this.state.editModal} toggle={this.editToggle} editData={this.state.editData} />

        }
      </div >
    )
  }
}

const mapStateToProps = (store) => {
  return {
    token: store.loginReducer.token,
    teacher: store.teacherReducer.teacher,
    isFetching: store.teacherReducer.isFetching
  }
}

export default connect(mapStateToProps, { getTeacher, addTeacher, deleteTeacher })(index);
  
