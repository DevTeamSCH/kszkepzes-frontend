import { combineReducers } from 'redux';
import UserReducer from './UserReducer';
import NewsReducer from './NewsReducer';
import AddNewsReducer from './AddNewsReducer';
import EditNewsReducer from './EditNewsReducer';
import HomeworksReducer from './HomeworksReducer';
import AddTaskReducer from './AddTaskReducer';
import AddSolutionReducer from './AddSolutionReducer';
import EventReducer from './EventReducer';
import NoteReducer from './NoteReducer';
import TraineeReducer from './TraineeReducer';
import CorrectSolutionReducer from './CorrectSolutionReducer';
import EditTaskReducer from './EditTaskReducer';
<<<<<<< HEAD
import MessageReducer from './MessageReducer';
=======
import GroupsReducer from './GroupsReducer';
import MentorsReducer from './MentorsReducer';
>>>>>>> dev

const rootReducer = combineReducers({
  user: UserReducer,
  news: NewsReducer,
  newNews: AddNewsReducer,
  selectedNews: EditNewsReducer,
  selectedTask: EditTaskReducer,
  events: EventReducer,
  trainees: TraineeReducer,
  notes: NoteReducer,
<<<<<<< HEAD
  homeworks: HomeworksReducer,
  newTask: AddTaskReducer,
  newSolution: AddSolutionReducer,
  correction: CorrectSolutionReducer,
  message: MessageReducer,
=======
  groups: GroupsReducer,
  mentors: MentorsReducer,
>>>>>>> dev
});

export default rootReducer;
