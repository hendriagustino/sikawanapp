import React, { Component } from 'react';
import {getjwt, getRole} from './helpers/getJwt';
import {withRouter} from 'react-router-dom';

class Auth extends Component {
  state = {
    jwt: null
  }

  componentDidMount() {
    const jwt = getjwt();
    const role = getRole();

    if(!jwt) {
      alert('You Must Login First');
      this.props.history.push("/");
    }else{
      this.setState({
        jwt: jwt
      })
    }
  }

  render() {
    if(this.state.jwt === null){
      return(
        <div><h1>Loading</h1></div>
      )
    }
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}

export default withRouter(Auth);
