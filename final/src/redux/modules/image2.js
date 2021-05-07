import { createAction, handleActions } from "redux-actions";
import produce from "immer";

const SET_PREVIEW = "SET_PREVIEW";
const GET_PREVIEW = "GET_PREVIEW";
const GET_FILE = "GET_FILE";
const DELETE_PREVIEW = "DELETE_PREVIEW";
const DELETE_FILE = "DELETE_FILE";

const setPreview = createAction(SET_PREVIEW, (preview) => ({ preview }));
const getPreview = createAction(GET_PREVIEW, (preview) => ({ preview }));
const getFile = createAction(GET_FILE, (file) => ({ file }));
const deletePreview = createAction(DELETE_PREVIEW, (preview) => ({ preview }));
const deleteFile = createAction(DELETE_FILE, (file) => ({ file }));

const initialState = {
  preview: ["http://via.placeholder.com/400x300"],
  file: [],
};

export default handleActions(
  {
    [SET_PREVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.preview.push(action.payload.preview);
        draft.preview = draft.preview.reduce((acc, cur) => {
          if (acc.findIndex((a) => a === cur) === -1) {
            return [...acc, cur];
          } else {
            acc[acc.findIndex((a) => a === cur)] = null;
            return acc;
          }
        }, []);
      }),
    [GET_PREVIEW]: (state, action) =>
      produce(state, (draft) => {
        draft.preview.push(action.payload.preview);

        draft.preview = draft.preview.filter((r) => {
          // 프리뷰 이미지를 걸러내주는 작업
          if (r !== "http://via.placeholder.com/400x300") {
            return [...draft.preview, r];
          }
        });
      }),
    [GET_FILE]: (state, action) =>
      produce(state, (draft) => {
        // draft.file = action.payload.file;
        draft.file.push(action.payload.file);
      }),
    [DELETE_PREVIEW]: (state, action) =>
      produce(state, (draft) => {
         draft.list = draft.list.filter((r, idx) => {
           if (r.id !== action.payload.id) {
             // console.log(r.id);
             return [...draft.list, r];
           }
         });
      }),
    [DELETE_FILE]: (state, action) =>
      produce(state, (draft) => {
         draft.list = draft.list.filter((r, idx) => {
           if (r.id !== action.payload.id) {
             // console.log(r.id);
             return [...draft.list, r];
           }
         });
      })
  },
  initialState
);

const actionCreators = {
  setPreview,
  getPreview,
  getFile,
};

export { actionCreators };
