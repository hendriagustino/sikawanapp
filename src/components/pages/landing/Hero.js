import React, { Component } from 'react';
import {Row, Col} from 'mdbreact';
import {Link} from 'react-router-dom';
import Illustration from './../../../assets/img/Illustration.png';
import Playstore from './../../../assets/img/playstore.png';


export default class Hero extends Component {
    render() {
        return (
          <div className="hero primary-color text-white" >
            <header className="container py-5">
              <Row>
                <Col>
                  <h1 style={{lineHeight: '.75em'}} className="font-weight-bold display-2 text-uppercase">Sikawan</h1>
                  <h3 style={{letterSpacing: '3px'}} className="mb-3">Sistem Kawal Pendidikan</h3>
                  <p style={{fontSize: '1.25em'}}>Application that connects Parents, Schools and Departement of Education to be able to collaborate and monitor student learning progress</p>
                  <Link to="#">
                    <img style={{width:'250px'}} src={Playstore} alt="Playstore" /> 
                  </Link>
                </Col>
                <Col>
                  <img src={Illustration} alt="Illustration" /> 
                </Col>
              </Row>
            </header>
          </div>
        )
    }
}
