import React, { Component } from 'react';
import { MDBIcon, MDBBtn, MDBDataTable } from 'mdbreact';
import AddSchool from './AddSchool';
import EditSchool from './EditSchool';
import { connect } from 'react-redux';

import { confirm } from './../../../modal/Confirm';
import { getSchool, addSchool, deleteSchool } from './../../../../store/actions/schoolAction';
import Loader from './../../../loader';

class index extends Component {

  state = {
    addModal: false,
    editModal: false,
    confirmModal: false,
    alertModal: false,
    editData: {
      id: '',
      npsn: '',
      name: '',
      address: '',
      email: '',
      doe: ''
    }
  }

  componentDidMount() {
    this.props.getSchool(this.props.token);
  }

  editToggle = (id, npsn, name, address, email, doe) => {
    this.setState({
      editModal: !this.state.editModal,
      editData: {
        id: id,
        npsn: npsn,
        name: name,
        address: address,
        email: email,
        doe: doe
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
        this.props.deleteSchool(this.props.token, id);
      },
      () => {
      }
    )
  }

  render() {

    const data = {
      columns: [
        {
          label: 'NPSN',
          field: 'npsn'
        },
        {
          label: 'NAME',
          field: 'name'
        },
        {
          label: 'ADDRESS',
          field: 'address'
        },
        {
          label: 'EMAIL',
          field: 'email'
        },
        {
          label: 'DOE',
          field: 'doe'
        },
        {
          label: 'ACTION',
          field: 'action'
        }
      ],
      rows: this.props.school.map(school => {
        return {
          npsn: school.npsn ? school.npsn : '',
          name: school.fullname ? school.fullname : '',
          address: school.address ? school.address : '',
          email: school.email ? school.email : '',
          doe: school.doe ? school.doe.fullname : '',
          action:
            <React.Fragment>
              <MDBBtn size="sm" color="success" onClick={() => this.editToggle(school._id, school.npsn, school.fullname, school.address, school.email, school.doe)} toggle={this.editToggle}>
                <MDBIcon icon="edit" /> EDIT
              </MDBBtn>

              <MDBBtn size="sm" color="red" onClick={() => this.confirmToggle(school._id)}>
                <MDBIcon icon="times" /> DELETE
              </MDBBtn>
            </React.Fragment>
        }
      })
    }

    return (
      <div>
        <Loader show={this.props.isFetching} />

        <h1 className="font-weight-bold">Schools List</h1>
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

        <AddSchool modal={this.state.addModal} toggle={this.addToggle} addSchool={this.addSchool} />

        {
          this.state.editModal &&
          <EditSchool modal={this.state.editModal} toggle={this.editToggle} editData={this.state.editData} />

        }

      </div >
    )
  }
}

const mapStateToProps = (store) => {
  return {
    token: store.loginReducer.token,
    school: store.schoolReducer.school,
    isFetching: store.schoolReducer.isFetching
  }
}

export default connect(
  mapStateToProps,{ getSchool, addSchool, deleteSchool })(index);

