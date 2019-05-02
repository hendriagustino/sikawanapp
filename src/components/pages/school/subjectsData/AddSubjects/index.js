import React, { Component } from 'react'
import { MDBBtn, MDBContainer, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter } from 'mdbreact';

import {connect} from 'react-redux';
import {getSubjects, addSubjects}  from './../../../../../store/actions/subjectsAction';

class index extends Component {

  state = {
    subjects : ''
  }

  addSubjects =(e)=> {
    this.setState({
        [e.target.id] : e.target.value
    })
  }

  handleClick=()=>{
    this.props.addSubjects(this.props.token, this.state.subjects);
    this.props.toggle();
  }

  render() {
    return (
      <div>
        <MDBContainer>
            <MDBModal isOpen={this.props.modal} toggle={this.props.toggle}>
                <MDBModalHeader toggle={this.props.toggle}>Add New Subjects</MDBModalHeader>

                <MDBModalBody>
                    <form>
                        <label htmlFor="subjects" className="grey-text">
                            SUBJECTS
                        </label>

                        <input
                            type="text"
                            id="subjects"
                            pattern="^(?!\s*$).+"
                            required
                            className="form-control"
                            onChange ={this.addSubjects}
                        />
                    </form>

                </MDBModalBody>

                <MDBModalFooter>
                    <MDBBtn size="sm" color="success" onClick={this.handleClick}> SUBMIT</MDBBtn>
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
    subjects: store.subjectsReducer.subjects,
    isFetching: store.subjectsReducer.isFetching
  }
}

export default connect(
  mapStateToProps,
  {addSubjects, getSubjects})(index);

