import axios from "axios";

import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
} from "../actiontypes/auth.types";

export const authlogin = (params) => (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  return axios
    .post(`https://mentor-students.vercel.app/api/login`, params)
    .then((response) => {
      
      const { token, user } = response.data;

      localStorage.setItem("token", token);

      dispatch({ type: LOGIN_SUCCESS, payload: { token, user } });

      return LOGIN_SUCCESS;
    })
    .catch((error) => {
      dispatch({ type: LOGIN_FAILURE, payload: error });
      return LOGIN_FAILURE;
    });
};
