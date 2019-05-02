import React, { Component } from 'react'
import { MDBBtn, MDBDataTable, MDBIcon } from "mdbreact";
import AddClass from './AddClass';
// import ShowClass from './ShowClass';
import EditClass from './EditClass';
import { connect } from 'react-redux';
import { confirm } from './../../../modal/Confirm';
// import { alert } from './../../../modal/Alert';
import { getClassroom, addClassroom, deleteClassroom } from './../../../../store/actions/classroomAction';
import Loader from './../../../loader';


class index extends Component {

  componentDidMount() {
    this.props.getClassroom(this.props.token)
  }

  state = {
    addModal: false,
    editModal: false,
    confirmModal: false,
    alertModal: false,
    editData: {
      id: '',
      grade: '',
      major: '',
      classes: ''
    }
  }

  addToggle = () => {
    this.setState({
      addModal: !this.state.addModal
    });
  }

  editToggle = (id, grade, major, classes) => {
    this.setState({
      editModal: !this.state.editModal,
      editData: {
        id: id,
        grade: grade,
        major: major,
        classes: classes
      }
    });
  }

  confirmToggle = (id) => {
    confirm("are you sure?").then(
      () => {
        this.props.deleteClassroom(this.props.token,id)
      },
      () => {

      }
    )
  }

  render() {

    const data = {
      columns: [
        // {
        //   label: 'ID',
        //   field: 'id'
        // },
        {
          label: 'GRADE',
          field: 'grade'
        },
        {
          label: 'MAJOR',
          field: 'major'
        },
        {
          label: 'CLASS',
          field: 'class'
        },
        {
          label: 'ACTION',
          field: 'action'
        }
      ],
      rows: this.props.classroom.map(classroom => {
        return {
          // id: classroom._id,
          grade: classroom.grade ? classroom.grade : '' ,
          major: classroom.major ? classroom.major : '',
          classes: classroom.classes ? classroom.classes : '',
          action:
            <React.Fragment>
              <MDBBtn size="sm" color="success" 
                toggle={this.props.toggle} 
                onClick={() => this.editToggle(classroom._id, classroom.grade, classroom.major, classroom.classes)}>
                <MDBIcon icon="edit" /> EDIT
              </MDBBtn>
              <MDBBtn size="sm" color="red" onClick={() => this.confirmToggle(classroom._id)}><MDBIcon icon="times" /> DELETE</MDBBtn>
            </React.Fragment>
        }
      })
    }

    return (
      <div>
        <h1 className="font-weight-bold">Class List</h1>
        <MDBBtn color="primary" onClick={this.addToggle}><MDBIcon icon='plus' />  ADD</MDBBtn>
        <AddClass modal={this.state.addModal} toggle={this.addToggle} />
        {
          this.state.editModal &&
          <EditClass modal={this.state.editModal} toggle={this.editToggle} editData={this.state.editData} />

        }
        <Loader show={this.props.isFetching} />

        <MDBDataTable
          small
          striped
          bordered
          hover
          data={data}
        />

      </div>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    classroom: store.classroomReducer.classroom,
    isFetching: store.classroomReducer.isFetching,
    token: store.loginReducer.token
  }
}

// diganti dengan destructuring jadi langsung {getClassroom} pada parameter kedua
// const mapDispatchToProps = () => {
//   return{
//     getClassroom: getClassroom
//   }
// }

export default connect(
  mapStateToProps,
  { getClassroom, addClassroom, deleteClassroom })(index);

