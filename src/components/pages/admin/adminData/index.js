import React, { Component } from 'react'
import { MDBBtn, MDBDataTable, MDBIcon } from "mdbreact";
import AddAdmin from './AddAdmin';
// import ShowAdmin from './ShowAdmin';
import EditAdmin from './EditAdmin';
// import {ConfirmModal, AlertModal} from '../../../modal';
import { connect } from 'react-redux';
import { confirm } from './../../../modal/Confirm';
import { getAdmin, deleteAdmin } from './../../../../store/actions/adminAdminAction';
import Loader from './../../../loader';

class index extends Component {

  componentDidMount() {
    this.props.getAdmin(this.props.token)
  }

  state = {
    addModal: false,
    editModal: false,
    confirmModal: false,
    alertModal: false
  }

  addToggle = () => {
    this.setState({
      addModal: !this.state.addModal
    });
  }

  editToggle = () => {
    this.setState({
      editModal: !this.state.editModal
    });
  }

  confirmToggle = (id) => {
    confirm("are you sure?").then(
      () => {
        this.props.deleteAdmin(this.props.token,id)
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
          field: '_id'
        },
        {
          label: 'USERNAME',
          field: 'username'
        },
        // {
        //   label: 'PASSWORD',
        //   field: 'password'
        // },
        {
          label: 'ACTION',
          field: 'action'
        }
      ],
      rows: this.props.admin.map(admin => {
        return {
          id: admin._id,
          username: admin.username,
          action:
            <React.Fragment>
              <MDBBtn size="sm" color="success" toggle={this.props.toggle} onClick={this.props.toggle}><MDBIcon icon="edit" /> EDIT</MDBBtn>
              <MDBBtn size="sm" color="red" onClick={() => this.confirmToggle(admin._id)}><MDBIcon icon="times" /> DELETE</MDBBtn>
            </React.Fragment>
        }
      })
    }

    return (
      <div>
        <h1 className="font-weight-bold">Admin</h1>
        <MDBBtn color="primary" onClick={this.addToggle}><MDBIcon icon="plus" />  ADD</MDBBtn>
        <AddAdmin modal={this.state.addModal} toggle={this.addToggle} />
        {/* <ShowAdmin toggle={this.editToggle} confirm={this.confirmToggle} /> */}
        <EditAdmin modal={this.state.editModal} toggle={this.editToggle} />
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
    admin: store.adminReducer.admin,
    isFetching: store.adminReducer.isFetching,
    token: store.loginReducer.token
  }
}

export default connect(
  mapStateToProps,
  { getAdmin, deleteAdmin })(index);

