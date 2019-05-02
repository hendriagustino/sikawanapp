import React, { Component } from 'react'
import { MDBDataTable, MDBBtn, MDBIcon } from "mdbreact";
import AddStudent from './AddStudent';
import EditStudent from './EditStudent';
import { connect } from 'react-redux';
import { confirm } from './../../../modal/Confirm';
// import { alert } from './../../../modal/Alert';

import { getStudent, deleteStudent } from './../../../../store/actions/studentAction';
import Loader from './../../../loader';

class index extends Component {

  state = {
    addModal: false,
    editModal: false,
    confirmModal: false,
    alertModal: false,
    editData: {
      id: '',
      nisn: '',
      name: '',
      parent: '',
      classroom: '',
      email: ''
    }
  }

  componentDidMount() {
    this.props.getStudent(this.props.token);
  }

  addToggle = () => {
    this.setState({
      addModal: !this.state.addModal
    });
  }

  editToggle = (id, nisn, name, parent, classroom, email) => {
    this.setState({
      editModal: !this.state.editModal,
      editData: {
        id: id,
        nisn: nisn,
        name: name,
        parent: parent,
        classroom: classroom,
        email: email
      }
    });
  }

  confirmToggle = (id) => {
    confirm("are you sure?").then(
      () => {
        this.props.deleteStudent(this.props.token, id)
      },
      () => {

      }
    )
  }

  render() {

    const data = {
      columns: [
        { label: 'Photo', field: 'photo'},
        { label: 'NISN', field: 'nisn' },
        { label: 'NAME', field: 'name' },
        { label: 'PARENT NAME', field: 'parent name' },
        { label: 'CLASS', field: 'class' },
        { label: 'EMAIL', field: 'email' },
        { label: 'ACTION', field: 'action' }
      ],
      rows: this.props.student.map(student => {
        return {
          photo: <img style={{width: '150px'}} src={student.image ? student.image : 'https://via.placeholder.com/150'} alt={student._id}/> ,
          nisn: student.nisn ? student.nisn : '',
          name: student.fullname ? student.fullname : '',
          parent: student.parent ? student.parent : '',
          class: student.kelas ? student.kelas.fullname : '',
          email: student.email ? student.email : '',
          action:
            <React.Fragment>
              <MDBBtn
                size="sm"
                color="success"
                toggle={this.props.toggle}
                onClick={() => this.editToggle(student._id, student.nisn, student.fullname, student.parent, student.kelas.fullname, student.email)}>
                <MDBIcon icon="edit" /> EDIT
              </MDBBtn>
              <MDBBtn size="sm" color="red" onClick={() => this.confirmToggle(student._id)}><MDBIcon icon="times" /> DELETE</MDBBtn>
            </React.Fragment>
        }
      })
    }

    return (
      <div>

        <Loader show={this.props.isFetching} />

        <h1 className="font-weight-bold">Student List</h1>
        <MDBBtn color="primary" onClick={this.addToggle}><MDBIcon icon="plus" />  ADD</MDBBtn>
        <Loader show={this.props.isFetching} />

        <MDBDataTable
          small
          striped
          bordered
          hover
          data={data}
        />

        <AddStudent modal={this.state.addModal} toggle={this.addToggle} />
        {
          this.state.editModal &&
          <EditStudent modal={this.state.editModal} toggle={this.editToggle} editData={this.state.editData} />
        }

      </div>
    )
  }
}

const mapStateToProps = store => {
  return {
    id: store.loginReducer.id,
    token: store.loginReducer.token,
    student: store.studentReducer.student,
    isFetching: store.studentReducer.isFetching
  }
}

export default connect(
  mapStateToProps, { getStudent, deleteStudent })(index);

