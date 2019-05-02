import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import {MDBBtn} from 'mdbreact';
import Logo from './../../../assets/img/Logo.png';
import Nav from './Nav';
import Hero from './Hero';
import About from './About';
import Feature from './Feature';
import Team from './Team';
import Footer from './Footer';

export default class index extends Component {
  render() {
    return (
      <div className="landing-page">
        <Nav />
        <Hero />
        <About />
        <Feature />
        <Team />
        <Footer />



        {/* <img src={Logo} />
        <h1>Welcome To Si Kawan</h1>
        <p>Sistem Kawal Pendidikan yang memberikan kemudahan bagi orang tua untuk mengawal perkembangan anak di sekolah</p>
        <Link to="/login"><MDBBtn color="primary">Login</MDBBtn></Link> */}
      </div>
    )
  }
}
