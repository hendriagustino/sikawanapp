import React, { Component } from 'react'
import {MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse} from 'mdbreact';
import Logo from './../../../assets/img/Logo.png';
import {Link} from 'react-router-dom';
import Illustration from './../../../assets/img/Illustration.png';

export default class nav extends Component {
    
    state = {
        isOpen: false
      };
      
    toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
    }

    render() {
        return (
            <div>
                <MDBNavbar color="primary-color-dark" dark expand="md">
                    <div className="container">
                    <MDBNavbarBrand>
                        <img style={{
                            width:'100px',
                            position:'absolute',
                            top: 0}} src={Logo} alt="sikawan logo" class="navbar-logo" />
                    </MDBNavbarBrand>
                    <MDBNavbarToggler onClick={this.toggleCollapse} />
                    <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
                    <MDBNavbarNav className="navbar-nav" right>
                        <Link className="text-white px-3 py-2 m-2 d.inline-block" to="#">Home</Link>
                        <Link className="text-white px-3 py-2 m-2 d.inline-block" to="#about">About</Link>
                        <Link className="text-white px-3 py-2 m-2 d.inline-block" to="#feature">Feature</Link>
                        <Link className="text-white px-3 py-2 m-2 d.inline-block" to="#team">Our Team</Link>
                        <Link className="bg-white rounded-sm px-3 py-2 m-2 d.inline-block" to="/login">Log In</Link>
                    </MDBNavbarNav>
                    </MDBCollapse>
                    </div>
                </MDBNavbar>
            </div>
        )
    }
}
