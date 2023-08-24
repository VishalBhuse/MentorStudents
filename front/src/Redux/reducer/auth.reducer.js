import { del, getLocalData, saveData } from "../../UTIL/index";
import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
} from "../actiontypes/auth.types";

const initState = {
  isAuth: !!getLocalData("token"),
  token: getLocalData("token") || "",
  isLoading: false,
  isError: false,
  userdata: null,
};

const authReducers = (state = initState, { type, payload }) => {
  switch (type) {
    case LOGIN_REQUEST: {
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    }
    case LOGIN_SUCCESS: {
      saveData("token", payload.token);
      return {
        ...state,
        isLoading: false,
        isAuth: true,
        token: payload.token,
        userdata: payload.user,
      };
    }
    case LOGIN_FAILURE: {
      return {
        ...state,
        isLoading: false,
        isError: true,
        isAuth: false,
        token: "",
        userdata: null,
      };
    }
    case LOGOUT: {
      del("token");
      del("auth");
      return {
        ...state,
        isLoading: false,
        isAuth: false,
        token: "",
        userdata: null,
      };
    }
    default: {
      return state;
    }
  }
};

export default authReducers;
