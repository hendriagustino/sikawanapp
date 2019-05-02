import React, { Component } from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBCardHeader,
  MDBBtn
} from "mdbreact";
import {connect} from 'react-redux';
import {login, checkLogin} from './../../../store/actions/loginAction';
import Loader from './../../loader';
import Logo from './../../../assets/img/Logo.png';


class index extends Component {
  componentDidMount() {

  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.login(this.state.username, this.state.password);

  }

  render() {
    return (
      <div className="login">
        <Loader show={this.props.isFetching} />
        <div className="login-box">
          <MDBCard>
            <MDBCardBody>
              <MDBCardHeader className="form-header white text-center border-0">
                <img style={{width:'150px'}} src={Logo} alt="sikawan logo"/>
                <h1 className="my-3 text-primary">Login</h1>
              </MDBCardHeader>
              <form onSubmit={this.handleSubmit}>
                <label
                  htmlFor="username"
                  className="grey-text font-weight-light mt-2">
                  Your username
                </label>
                <input
                  type="text"
                  id="username"
                  className="form-control"
                  required
                  onChange={this.handleChange}
                />

                <label
                  htmlFor="password"
                  className="grey-text font-weight-light mt-2">
                  Your password
                </label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  required
                  onChange={this.handleChange}
                />

                <div className="text-center mt-4">
                  <MDBBtn color="primary" className="mb-3 btn-block" type="submit">
                    Login
                  </MDBBtn>
                </div>
              </form>
            </MDBCardBody>
          </MDBCard>
        </div>
      </div>
    )
  }
}

const mapStateToProps = store => {
  return {
    token: store.loginReducer.token,
    isLogin: store.loginReducer.isLogin,
    isFetching: store.loginReducer.isFetching,
    errorMessage: store.loginReducer.message
  }
}

export default connect(mapStateToProps, {login, checkLogin})(index);
