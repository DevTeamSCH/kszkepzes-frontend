import { WRITE_SOLUTION, CHECK, SETCHECKTRUE, CLEAR_WRITE, SELECT_SOLUTION } from '../actions/types';

const INITIAL_STATE = {
  accepted: false,
  corrected: false,
  note: '',
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SELECT_SOLUTION:
      return {
        corrected: action.payload.corrected,
        accepted: action.payload.accepted,
        note: action.payload.note,
      };
    case WRITE_SOLUTION:
      return { ...state, [action.target]: action.payload };
    case CHECK:
      return {
        ...state,
        [action.target]: !state[action.target],
      };
    case SETCHECKTRUE:
      return {
        ...state,
        [action.target]: true,
      };
    case CLEAR_WRITE:
      return INITIAL_STATE;
    default:
      return state;
  }
};
