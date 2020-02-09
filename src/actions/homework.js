import axios from './session';
import { GET_TASKS,
  GET_SOLUTIONS,
  ADD_TASK,
  DELETE_TASK,
  WRITE_TASK,
  EDIT_TASK,
  SELECT_TASK,
  CLEAR_WRITE,
  ADD_SOLUTION,
  WRITE_SOLUTION,
  WRITE_SOLUTION_FILE,
  GET_PROFILES,
  ADD_DOCUMENT,
  GET_DOCUMENTS,
  CORRECT_SOLUTION,
  SELECT_SOLUTION,
  CHECK, SETCHECKTRUE } from './types';

export const getTasks = () => (
  async (dispatch) => {
    try {
      const response = await axios.get('/api/v1/homework/tasks/');
      dispatch({
        type: GET_TASKS,
        payload: response.data,
      });
    } catch (e) {
      console.log(e);
    }
  }
);

export const getSolutions = taskId => (
  async (dispatch) => {
    try {
      const response = await axios.get('/api/v1/homework/solutions/', { task: taskId });
      dispatch({
        type: GET_SOLUTIONS,
        payload: response.data,
      });
    } catch (e) {
      console.log(e);
    }
  }
);

export const addTask = ({ title, text, deadline, bits }) => (
  async (dispatch) => {
    try {
      const response = await axios.post('/api/v1/homework/tasks/', {
        title,
        text,
        deadline,
        bits,
      });
      if (response.data.id) {
        dispatch({
          type: ADD_TASK,
          payload: response.data,
        });
      }
    } catch (e) {
      console.log(e);
    }
  }
);

export const editTask = ({
  id,
  title,
  text,
  deadline,
  bits,
}) => (
  async (dispatch) => {
    try {
      const response = await axios.patch(`/api/v1/homework/tasks/${id}/`, {
        title,
        text,
        deadline,
        bits,
      });
      if (response.data.id) {
        dispatch({
          type: EDIT_TASK,
          payload: response.data,

        });
      }
    } catch (e) {
      console.log(e);
    }
  }
);

export const deleteTask = task => (
  async (dispatch) => {
    try {
      const response = await axios.delete(`/api/v1/homework/tasks/${task.id}/`);
      if (!response.data.id) {
        dispatch({
          type: DELETE_TASK,
          payload: task,
        });
      }
    } catch (e) {
      console.log(e);
    }
  });

export const setSelectedTask = task => (
  (dispatch) => {
    dispatch({ type: SELECT_TASK, payload: task });
  }
);

export const addDocument = ({
  name, description, file, solution,
}) => (
  async (dispatch) => {
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('file', file);
      formData.append('solution', solution);
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      };
      const response = await axios.post('/api/v1/documents/', formData, config);
      if (response.data.id) {
        dispatch({
          type: ADD_DOCUMENT,
          payload: response.data,
        });
      }
    } catch (e) {
      console.log(e);
    }
  }
);

export const addSolution = ({
  task, accepted, corrected, note, name, description, file,
}) => (
  async (dispatch) => {
    try {
      const response = await axios.post('/api/v1/homework/solutions/', {
        task,
        accepted,
        corrected,
        note,
      });
      if (response.data.id) {
        dispatch({
          type: ADD_SOLUTION,
          payload: response.data,
        });
      }

      const solution = response.data.id;

      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('file', file);
      formData.append('solution', solution);
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      };
      const responsedoc = await axios.post('/api/v1/documents/', formData, config);
      if (responsedoc.data.id) {
        dispatch({
          type: ADD_DOCUMENT,
          payload: responsedoc.data,
        });
      }
    } catch (e) {
      console.log(e);
    }
  }
);

export const getDocuments = (solutionID) => (
  async (dispatch) => {
    try {
      const response =
      await axios.get('/api/v1/documents', { params: { solution: solutionID } });
      dispatch({
        type: GET_DOCUMENTS,
        payload: response.data,
      });
    } catch (e) {
      console.log(e);
    }
  }
);

export const writeSolution = ({ target: { name, value } }) => (
  (dispatch) => {
    dispatch({ type: WRITE_SOLUTION, payload: value, target: name });
  }
);

export const writeSolutionFile = ({ target: { files } }) => (
  (dispatch) => {
    dispatch({ type: WRITE_SOLUTION_FILE, payload: files[0], target: 'file' });
  }
);

export const writeTask = ({ target: { name, value } }) => (
  (dispatch) => {
    dispatch({ type: WRITE_TASK, payload: value, target: name });
  }
);

export const writeTaskDeadline = ({ name, value }) => (
  (dispatch) => {
    dispatch({ type: WRITE_TASK, payload: value, target: name });
  }
);

export const clearWrite = () => (
  (dispatch) => {
    dispatch({ type: CLEAR_WRITE });
  }
);

export const getProfiles = () => (
  async (dispatch) => {
    try {
      const response = await axios.get('/api/v1/profiles/');
      dispatch({
        type: GET_PROFILES,
        payload: response.data,
      });
    } catch (e) {
      console.log(e);
    }
  }
);

export const correctSolution = (id, corrected, accepted, note) => (
  async (dispatch) => {
    try {
      const response = await axios.patch(`/api/v1/homework/solutions/${id}/`, {
        corrected,
        accepted,
        note,
      });
      if (response.data.id) {
        dispatch({
          type: CORRECT_SOLUTION,
          payload: response.data,

        });
      }
    } catch (e) {
      console.log(e);
    }
  }
);

export const check = name => (
  (dispatch) => {
    dispatch({ type: CHECK, target: name });
  }
);

export const setchecktrue = name => (
  (dispatch) => {
    dispatch({ type: SETCHECKTRUE, target: name });
  }
);

export const selectSolution = solution => (
  (dispatch) => {
    dispatch({
      type: SELECT_SOLUTION,
      payload: solution,
    });
  }
);
