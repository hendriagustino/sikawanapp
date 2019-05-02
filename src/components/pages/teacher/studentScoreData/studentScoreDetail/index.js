import React, { Component } from 'react';
import {
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBIcon,
  MDBDataTable
} from 'mdbreact';
import AddStudentScore from './AddStudentScore';
import EditStudentScore from './EditStudentScore';
import { connect } from 'react-redux';
import { confirm } from './../../../../modal/Confirm';
import { alert } from './../../../../modal/Alert';
import Loader from './../../../../loader';

import {getScoreByStudent} from './../../../../../store/actions/scoreAction';
import {deleteScore} from './../../../../../store/actions/scoreAction';

class index extends Component {
  state = {
    addModal: false,
    editModal: false
  }

  componentDidMount() {
    this.props.getScoreByStudent(this.props.token, this.props.match.params.student_id);
  }

  addToggle = () => {
    this.setState({
      addModal: !this.state.addModal
    });
  }

  editToggle = () => {
    this.setState({
      editModal: !this.state.editModal
    });
  }

  confirmToggle = id => {
    confirm("are you sure?").then(
      () => {
        this.props.deleteScore(this.props.token, this.props.scores.student._id, id);
      },
      () => {

      }
    )
  }

  render() {

    const dataTable = {
      columns: [
        {label: 'Date', field: 'date'},
        {label: 'Category', field: 'category'},
        {label: 'Point', field: 'point'},
        {label: 'Action', field: 'action'},
      ],
      rows: this.props.scores.scores ?
      this.props.scores.scores.map(score => {
        return {
          date: score.createdAt,
          category: score.category,
          point: score.point,
          action: 
            <div>
              <MDBBtn color="success" size="sm" onClick={this.editToggle}><MDBIcon icon="edit" /> Edit </MDBBtn>
              <MDBBtn color="danger" size="sm" onClick={() => this.confirmToggle(score._id)}><MDBIcon icon="times" /> Delete </MDBBtn>
            </div>
        }
      }) : []
    }

    return (
      <div>
        <Loader show={this.props.isFetching}/>
        <MDBRow>
          <MDBCol md="6">
            <h1 className="font-weight-bold">{this.props.scores.student && this.props.scores.student.fullname}</h1>
            <h4 style={{textTransform:'uppercase'}}>{this.props.scores.student && this.props.scores.student.kelas.fullname}</h4>
          </MDBCol>
          <MDBCol className="text-right" md="6">
            {/* <h4>mapel</h4> */}
          </MDBCol>
        </MDBRow>

        <MDBBtn color="primary" onClick={this.addToggle}><MDBIcon icon="plus" /> ADD </MDBBtn>
        <AddStudentScore toggle={this.addToggle} modal={this.state.addModal} studentId={this.props.match.params.student_id}/>
        <EditStudentScore toggle={this.editToggle} modal={this.state.editModal}/>
      
        <MDBDataTable
          bordered
          striped
          small
          data={dataTable}
        />
      </div>
    )
  }
}

const mapStateToProps = store => {
  return {
    token: store.loginReducer.token,
    isFetching: store.scoreReducer.isFetching,
    scores: store.scoreReducer.scores
  }
}

export default connect(mapStateToProps, {getScoreByStudent, deleteScore})(index);

