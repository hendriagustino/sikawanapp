import React, { Component } from 'react';
import {Row, Col} from 'mdbreact';
import Logo from './../../../assets/img/Logo.png';

export default class Footer extends Component {
    render() {
        return (
            <footer class="footer primary-color-dark">
                <div className="container">
                <Row>
                    <Col><img src={Logo} alt="" /></Col>
                    <Col>
                        <ul>
                            <li className='footer-item'> <a href="#">Address</a> </li>
                            <li className='footer-item'> <a href="#">Hotline Support</a> </li>
                        </ul>
                    </Col>
                    <Col>
                        <ul>
                            <li className='footer-item'> <a href="#">Email</a> </li>
                            <li className='footer-item'> <a href="#">Instagram</a> </li>
                            <li className='footer-item'> <a href="#">Facebok</a> </li>
                            <li className='footer-item'> <a href="#">Twitter</a> </li>
                            <li className='footer-item'> <a href="#">Youtube</a> </li>
                        </ul>
                    </Col>
                </Row>
                </div>
            </footer>
        )
    }
}
