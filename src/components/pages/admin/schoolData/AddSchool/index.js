import React, { Component } from 'react'
import { MDBBtn, MDBContainer, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import { connect } from 'react-redux';

import { getSchool, addSchool } from './../../../../../store/actions/schoolAction';
import { getDoe } from './../../../../../store/actions/doeAction';


class index extends Component {

  state = {
    npsn: '',
    name: '',
    address: '',
    email: '',
    doe: ''
  }

  componentDidMount() {
    this.props.getDoe(this.props.token);
  }

  addSchool = (e) => {
    console.log(e.target.id, e.target.value);
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleClick = () => {
    const data = {
      npsn: this.state.npsn,
      fullname: this.state.name,
      email: this.state.email,
      address: this.state.address,
      doe: this.state.doe
    }
    this.props.addSchool(this.props.token, data);
    this.props.toggle();
  }

  render() {
    return (
      <div>
        <MDBContainer>
          <MDBModal isOpen={this.props.modal} toggle={this.props.toggle}>
            <MDBModalHeader toggle={this.props.toggle}>Add New School</MDBModalHeader>

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
                  onChange={this.addSchool}
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
                  onChange={this.addSchool}
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
                  onChange={this.addSchool}
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
                  onChange={this.addSchool}
                />

                <label htmlFor="doe" className="grey-text mt-2">
                  DOE
                </label>

                <select id="doe" className="browser-default custom-select" onChange={this.addSchool}>
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
              <MDBBtn size="sm" color="success" onClick={this.handleClick}>SUBMIT</MDBBtn>
              <MDBBtn size="sm" color="red" onClick={this.props.toggle}>CANCEL</MDBBtn>
            </MDBModalFooter>

          </MDBModal>
        </MDBContainer>
      </div>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    token: store.loginReducer.token,
    school: store.schoolReducer.school,
    doe: store.doeReducer.doe,
    isFetching: store.schoolReducer.isFetching
  }
}

export default connect(
  mapStateToProps,
  { addSchool, getSchool, getDoe })(index);

