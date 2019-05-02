import {combineReducers} from 'redux';
import {studentReducer} from './studentReducer';
import {scheduleReducer} from './scheduleReducer';
import {loginReducer} from './loginReducer';
import {subjectsReducer} from './subjectsReducer';
import {classroomReducer} from './classroomReducer';
import {teacherReducer} from './teacherReducer';
import {doeReducer} from './doeReducer';
import {adminReducer} from './adminReducer';
import {schoolReducer} from './schoolReducer';
import {attendanceReducer} from './attendanceReducer';
import {complaintReducer} from './complaintReducer';
import {scoreReducer} from './scoreReducer';

export const rootReducer = combineReducers({
  studentReducer,
  scheduleReducer,
  loginReducer,
  subjectsReducer,
  classroomReducer,
  teacherReducer,
  doeReducer,
  adminReducer,
  schoolReducer,
  attendanceReducer,
  complaintReducer,
  scoreReducer
})

