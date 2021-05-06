import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { history } from "../configStore";
import axios from "axios";
import { config } from "../../shared/config";
import { setCookie, getCookie, deleteCookie } from "../../shared/Cookie";

// actions
const SET_USER = "SET_USER";
const GET_USER = "GET_USER";
const LOG_OUT = "LOG_OUT";
const LOADING = "LOADING";

// actionCreators: createAction
const setUser = createAction(SET_USER, (user) => ({ user }));
const getUser = createAction(GET_USER, (user) => ({ user }));
const logOut = createAction(LOG_OUT, (user) => ({ user }));
const loading = createAction(LOADING, (is_loading) => ({ is_loading }));

// initial State
const initialState = {
  user: "", //null
  is_login: false,
  profileImg: "",
  is_loading: false,
};

//API요청(middleware actions)

// 회원가입
const signupAPI = (nickname, email, pwd, rePwd) => {
  return function (dispatch, getState, { history }) {
    axios
      .post(`${config.api}/user/signup`, {
        nickname: nickname,
        email: email,
        password: pwd,
        pwdchk: rePwd,
      })
      .then((res) => {
        console.log("signupAPI(res)", res);
        window.alert("회원가입이 되었습니다!");
        history.push("/login");
      })
      .catch((err) => {
        window.alert("회원가입 실패");
        console.log("회원가입 실패:", err);
      });
  };
};

// 로그인
const loginAPI = (email, pwd) => {
  return function (dispatch, getState, { history }) {
    // console.log("로그인 값", email, pwd);
    axios
      .post(`${config.api}/user/login`, {
        email: email,
        password: pwd,
      })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("nickname", res.data.nickname);
        setCookie("jwt", res.data.token);
        dispatch(setUser(res.data)
        );
        history.push("/");
      })
      .catch((err) => {
        window.alert("로그인 실패", err);
        console.log("로그인 실패", err);
      });
  };
};

// 로그인 상태 확인 (페이지가 바뀔 때마다)
const loginCheck = (jwt) => {
  return function (dispatch, getstate, { history }) {
    if (jwt) {
      dispatch(setUser(jwt));
    } else {
      dispatch(logOut());
    }
  };
};


// 해당유저의 정보 가져오기 : Story의 유저정보
const getUserInfoAPI = (nickname) => {
  return function (dispatch, getState, { history }) {
    axios
      .get(`${config.api}/story/${nickname}`)
      .then((res) => {
        console.log(res.data.data);
        let doc = res.data.account;
        console.log(doc);

        let user = {
          nickname: doc.writer,
          profileImgUrl: doc.profileImgUrl,
          introduction: doc.introduceMsg,
        };
        console.log(user);
        dispatch(setUser(user));
      })
      .catch((err) => {
        console.error("게시물을 가져오는데 문제가 있습니다", err);
      });
  };
};

// reducer: handleActions(immer를 통한 불변성 유지)
export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user;
        draft.is_login = true;
      }),
    [GET_USER]: (state, action) =>
      produce(state, (draft) => {
        localStorage.getItem("nickname");
        draft.user = action.payload.user;
        draft.is_login = true;
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        deleteCookie("jwt");
        localStorage.removeItem("nickname");
        draft.user = null;
        draft.is_login = false;
      }),
    [LOADING]: (state, action) =>
      produce(state, (draft) => {
        draft.is_loading = action.payload.is_loading;
      }),
  },
  initialState
);

// actionCreators export
const actionCreators = {
  setUser,
  getUser,
  logOut,
  signupAPI,
  loginAPI,
  loginCheck,
<<<<<<< HEAD
  getUserInfoAPI,
=======
  loading,
  // getUserInfoAPI,
>>>>>>> upstream/master
};

export { actionCreators };
