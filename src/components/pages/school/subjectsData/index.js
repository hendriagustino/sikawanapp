import React, { Component } from 'react'
import { MDBDataTable, MDBBtn, MDBIcon } from 'mdbreact';
import AddSubjects from './AddSubjects';
import EditSubjects from './EditSubjects';
import { connect } from 'react-redux';

import { confirm } from './../../../modal/Confirm';

import { getSubjects, addSubjects, deleteSubjects } from './../../../../store/actions/subjectsAction';
import Loader from './../../../loader';

class index extends Component {

  state = {
    addModal: false,
    editModal: false,
    editData: {
      id: '',
      subjects: ''
    }
  }

  componentDidMount() {
    this.props.getSubjects(this.props.token);
  }

  editToggle = (id, subjects) => {
    this.setState({
      editModal: !this.state.editModal,
      editData :{
        id: id,
        subjects: subjects
      }
    });
  }

  addToggle = () => {
    this.setState({
      addModal: !this.state.addModal,
    });
  }

  confirmToggle = (id) => {
    confirm("Are you sure?").then(
      () => {
        this.props.deleteSubjects(this.props.token, id);
      },
      () => {
      }
    )
  }

  render() {

    const data = {
      columns: [
        {
          label: 'ID',
          field: 'id'
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
      rows: this.props.subjects.map(subject => {
        return {
          id: subject._id ? subject._id : '',
          subject: subject.name ? subject.name : '',
          action:
            <React.Fragment>
              <MDBBtn size="sm" color="success"  onClick={() => this.editToggle(subject._id, subject.name)} toggle={this.editToggle} >

                <MDBIcon icon="edit" /> EDIT
              </MDBBtn>

              <MDBBtn size="sm" color="red" onClick={() => this.confirmToggle(subject._id)}>
                <MDBIcon icon="times" /> DELETE
              </MDBBtn>
            </React.Fragment>
        }
      })
    }

    return (
      <div>
        <Loader show={this.props.isFetching} />
        <h1 className="font-weight-bold">Subjects List</h1>
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

        <AddSubjects modal={this.state.addModal} toggle={this.addToggle} addSubjects={this.addSubjects} />

        {
          this.state.editModal &&
          <EditSubjects modal={this.state.editModal} toggle={this.editToggle} editData={this.state.editData}/>
        }

      </div>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    token: store.loginReducer.token,
    subjects: store.subjectsReducer.subjects,
    isFetching: store.subjectsReducer.isFetching
  }
}

export default connect(
  mapStateToProps,
  { getSubjects, addSubjects, deleteSubjects })(index);

