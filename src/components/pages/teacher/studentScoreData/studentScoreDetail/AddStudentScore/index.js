import React, { Component } from 'react'
import { MDBBtn, MDBContainer, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';
import {connect} from 'react-redux';
import {addScore} from './../../../../../../store/actions/scoreAction';
import Loader from './../../../../../loader';

class index extends Component {
  state = {
    category: 'assignment',
    point: ''
  }

  handleChange = e => {
    this.setState({
      [e.target.id] : e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.addScore(this.props.token, this.props.studentId, this.state);
    this.props.toggle();
  }

  render() {
    return (
      <div>
        <Loader show={this.props.isFetching}/>
        <MDBContainer>
          <MDBModal isOpen={this.props.modal} toggle={this.props.toggle}>
            <MDBModalHeader toggle={this.props.toggle}>Add New Score</MDBModalHeader>
            
            <form onSubmit={this.handleSubmit}>
              <MDBModalBody>
                <label htmlFor="category" className="grey-text mt-2">
                  Category
                </label>

                <select id="category" className="form-control" onChange={this.handleChange}>
                  <option value="assignment">Assignment</option>
                  <option value="quiz">Quiz</option>
                  <option value="uts">UTS</option>
                  <option value="uas">UAS</option>
                </select>

                <label htmlFor="point" className="grey-text mt-2">
                  Point
                </label>

                <input
                  type="number"
                  id="point"
                  className="form-control"
                  onChange={this.handleChange}
                  pattern="^(?!\s*$).+"
                  required
                />
              </MDBModalBody>
              
              <MDBModalFooter>
                <MDBBtn type="submit" color="success">SUBMIT</MDBBtn>
                <MDBBtn color="red" onClick={this.props.toggle}>CANCEL</MDBBtn>
              </MDBModalFooter>
            </form>

          </MDBModal>
        </MDBContainer>
      </div>
    );
  }
}

const mapStateToProps = store => {
  return {
    token: store.loginReducer.token,
    isFetching: store.scoreReducer.isFetching
  }
}

export default connect(mapStateToProps, {addScore})(index);