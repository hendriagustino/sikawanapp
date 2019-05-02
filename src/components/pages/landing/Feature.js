import React, { Component } from 'react';
import {Row, Col, MDBIcon} from 'mdbreact';

export default class Feature extends Component {
    render() {
        return (
            <section id="feature" className="feature grey lighten-3">
                <div className="container text-center">
                <h2 className="h2 mb-5">Feature</h2>
                <Row>
                    <Col className="grey lighten-3">
                        <MDBIcon 
                            className="text-primary"
                            icon="book"
                            style={{
                                padding: '.25em',
                                fontSize: '5em',
                            }}/>
                        <h3>Grade</h3>
                        <p>Forget paper, get the ease of accessing your children's grades to monitor their progress at school.</p>
                   
                    </Col>
                    <Col className="grey lighten-4">
                        <MDBIcon 
                            className="text-primary"
                            icon="school"
                            style={{
                                padding: '.25em',
                                fontSize: '5em',
                            }}/>
                        <h3>Presence</h3>
                        <p>You will be facilitated to monitor the presence of your children. Always connect with your children.</p>
                    </Col>
                    <Col className="grey lighten-3">
                        <MDBIcon 
                            className="text-primary"
                            icon="phone"
                            style={{
                                padding: '.25em',
                                fontSize: '5em',
                            }}/>
                        <h3>Report</h3>
                        <p>SiKawan is connected with Departement of Education, report complaints about the education system that you experiences.</p>

                    </Col>
                </Row>
                </div>
            </section>
        )
    }
}
