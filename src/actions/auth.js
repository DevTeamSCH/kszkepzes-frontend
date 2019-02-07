import axios from './session';
import { GET_USERDATA, PROFILE_CHANGE, GROUP_CHANGE } from './types';
import { showMessage } from './messages';

export const getUserData = () => (
  async (dispatch) => {
    try {
      const user = await axios.get('/api/v1/profiles/me');
      const {
        id,
        join_date: joinDate,
        full_name: fullName,
        nick,
        motivation_about: motivationAbout,
        motivation_profession: motivationProfession,
        motivation_exercise: motivationExercise,
        signed,
        groups,
        role,
      } = user.data;
      let permission;
      switch (role) {
        case 'Applicant':
          permission = 1;
          break;
        case 'Student':
          permission = 2;
          break;
        case 'Staff':
          permission = 3;
          break;
        default:
          permission = 0;
          break;
      }

      dispatch({
        type: GET_USERDATA,
        payload: {
          id, fullName, joinDate, nick, motivationAbout, motivationProfession, motivationExercise, signed, groups, role, permission
        },
      });
    } catch (e) {
      console.log(e);
    }
  }
);

export const textChange = ({ target: { name, value } }) => (
  (dispatch) => {
    dispatch({ type: PROFILE_CHANGE, payload: value, target: name });
  }
);

export const groupChange = groups => (
  dispatch => (dispatch({ type: GROUP_CHANGE, payload: groups }))
);

export const submitRegistration = ({
  nick, groups, signed, motivationAbout, motivationProfession, motivationExercise, id,
}) => (
  async (dispatch) => {
    try {
      const response = await axios.patch(`/api/v1/profiles/${id}/`, {
        nick,
        groups,
        signed,
        motivation_about: motivationAbout,
        motivation_profession: motivationProfession,
        motivation_exercise: motivationExercise,
      });
      if (response.data.id === id) {
        dispatch(showMessage('Sikeres mentés!', 'success'));
      } else {
        dispatch(showMessage('A mentés nem sikerült!', 'error'));
      }
    } catch (e) {
      dispatch(showMessage('A mentés nem sikerült!', 'error'));
    }
  }
);
