import React, { Component } from 'react'
import { MDBIcon, MDBBtn, MDBDataTable } from 'mdbreact';
import AddDoe from './AddDoe';
import EditDoe from './EditDoe';
import { connect } from 'react-redux';

import { confirm } from './../../../modal/Confirm';

import { getDoe, addDoe, deleteDoe } from './../../../../store/actions/doeAction';
import Loader from './../../../loader';

class index extends Component {

  state = {
    addModal: false,
    editModal: false,
    confirmModal: false,
    alertModal: false,
    editData: {
      id: '',
      name: '',
      email: ''
    }
  }

  componentDidMount() {
    this.props.getDoe(this.props.token);
  }

  editToggle = (id, name, email) => {
    this.setState({
      editModal: !this.state.editModal,
      editData: {
        id: id,
        name: name,
        email: email
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
        this.props.deleteDoe(this.props.token, id);
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
          label: 'NAME',
          field: 'name'
        },
        {
          label: 'EMAIL',
          field: 'email'
        },
        {
          label: 'ACTION',
          field: 'action'
        }
      ],
      rows: this.props.doe.map(doe => {
        return {
          id: doe._id ? doe._id : '',
          name: doe.fullname ? doe.fullname : '',
          email: doe.email ? doe.email : '',
          action:
            <React.Fragment>
              <MDBBtn size="sm" color="success" onClick={() => this.editToggle(doe._id, doe.fullname, doe.email)} toggle={this.editToggle}>
                <MDBIcon icon="edit" /> EDIT
              </MDBBtn>

              <MDBBtn size="sm" color="red" onClick={() => this.confirmToggle(doe._id)}>
                <MDBIcon icon="times" /> DELETE
              </MDBBtn>
            </React.Fragment>
        }
      })
    }

    return (

      <div>
        <Loader show={this.props.isFetching} />

        <h1 className="font-weight-bold">Department Of Education List</h1>
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

        <AddDoe modal={this.state.addModal} toggle={this.addToggle} addDoe={this.addDoe} />

        {
          this.state.editModal &&
          <EditDoe modal={this.state.editModal} toggle={this.editToggle} editData={this.state.editData} />

        }

      </div >
    )
  }
}

const mapStateToProps = (store) => {
  return {
    token: store.loginReducer.token,
    doe: store.doeReducer.doe,
    isFetching: store.doeReducer.isFetching
  }
}

export default connect(
  mapStateToProps,
  { getDoe, addDoe, deleteDoe })(index);

