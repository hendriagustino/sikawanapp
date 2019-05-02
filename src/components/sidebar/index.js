import React, { Component } from 'react';
import {NavLink, withRouter, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {logout} from './../../store/actions/loginAction';
import Logo from './../../assets/img/Logo.png';
import {MDBIcon} from 'mdbreact';

class index extends Component {

  handleLogout = () => {
    this.props.logout();
    this.props.history.push("/");
    window.location.reload();
  }

  render() {
    const { menuItem } = this.props;
    const menuItemList = menuItem.map((item, i) => {
      return (
        <li className="sidebar-menu-item" key={i}>
          <NavLink to={"/"+item.charAt(0).toLowerCase()+item.split(" ").join("").slice(1)}>
            {item}
          </NavLink>
        </li>
      )
    })

    return (
      <div className="sidebar">
        <div className="sidebar-user">
          <Link to="/"><img src={this.props.image ? this.props.image : Logo} alt="user avatar" className="sidebar-user-avatar"/></Link>
          <Link to="/" style={{color:'white'}}><h3 className="sidebar-user-title">{this.props.fullname ? this.props.fullname : ''}</h3></Link>
          <h4 className="sidebar-user-subtitle">{this.props.email ? this.props.email : ''}</h4>
        </div>
        <ul className="sidebar-menu"> 
          { menuItemList }
          <li className="sidebar-menu-item logout">
            <Link onClick={this.handleLogout}><MDBIcon icon="sign-out-alt"/> Logout</Link>
          </li>
        </ul>
      </div>
    )
  }
}

const mapStateToProps = store => {
  return {
    token: store.loginReducer.token,
    isLogin: store.loginReducer.isLogin,
    fullname: store.loginReducer.fullname,
    email: store.loginReducer.email,
    image: store.loginReducer.image,
    errorMessage: store.loginReducer.message
  }
}

export default withRouter(connect(mapStateToProps, {logout})(index));

