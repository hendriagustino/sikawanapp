import React, { Component } from 'react'
import { MDBBtn, MDBContainer, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import {connect} from 'react-redux';

import {editSchool} from './../../../../../store/actions/schoolAction';
import {getDoe} from './../../../../../store/actions/doeAction';

class index extends Component {

  state = {
    id: '',
    npsn: '',
    name: '',
    address: '',
    email: '',
    doe: ''
  }

  componentDidMount() {
    this.setState({
      id: this.props.editData.id,
      npsn: this.props.editData.npsn,
      name: this.props.editData.name,
      address: this.props.editData.address,
      email: this.props.editData.email,
      doe: this.props.editData.doe
    });
    this.props.getDoe(this.props.token);
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  }

  render() {

    return (
      <div>
        <MDBContainer>
          <MDBModal isOpen={this.props.modal} toggle={this.props.toggle}>
            <MDBModalHeader toggle={this.props.toggle}>Edit School</MDBModalHeader>

            <MDBModalBody>
              <form>
                <label htmlFor="npsn" className="grey-text">
                  NPSN
                </label>

                <input
                  type="text"
                  id="npsn"
                  pattern="^(?!\s*$).+"
                  required
                  className="form-control"
                  onChange={this.handleChange}
                  value={this.state.npsn}
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

                <label htmlFor="address" className="grey-text mt-2">
                  Address
                </label>

                <input
                  type="text"
                  id="address"
                  pattern="^(?!\s*$).+"
                  required
                  className="form-control"
                  onChange={this.handleChange}
                  value={this.state.address}
                />

                <label htmlFor="email" className="grey-text mt-2">
                  Email
                </label>

                <input
                  type="email"
                  id="email"
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  required
                  className="form-control"
                  onChange={this.handleChange}
                  value={this.state.email}
                />

                <label htmlFor="subjects" className="grey-text mt-2">
                  DOE
                </label>

                <select id="doe" className="browser-default custom-select" onChange={this.handleChange}>
                  <option>Choose your option</option>
                  {
                    this.props.doe.map(doe => {
                      return (
                        <option value={doe._id}>{doe.fullname}</option>
                      )
                    })
                  }
                </select>

              </form>

            </MDBModalBody>

            <MDBModalFooter>
              <MDBBtn size="sm" color="success" onClick={() => {
                const data = {
                  id: this.state.id,
                  npsn: this.state.npsn,
                  name: this.state.name,
                  address: this.state.address,
                  email: this.state.email,
                  doe: this.state.doe
                }

                this.props.editSchool(this.props.token, data.id, data);
                this.props.toggle();
              }
              }>SUBMIT</MDBBtn>


              <MDBBtn size="sm" color="red" onClick={this.props.toggle}>CANCEL</MDBBtn>
            </MDBModalFooter>

          </MDBModal>
        </MDBContainer>
      </div>
    )
  }
}

const mapStateToProps = (store) =>{
  return {
    token: store.loginReducer.token,
    doe: store.doeReducer.doe,
    isFetching: store.schoolReducer.isFetching
  }
}

export default connect ( mapStateToProps, {editSchool, getDoe})(index);
