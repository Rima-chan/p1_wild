import { actions } from "./actions";

export const initialState = {
  wilders: [],
  errors: {},
};

export const wildersReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_WILDERS: {
      if (action.payload.success) {
        return { ...state, wilders: action.payload.result };
      } else if (action.payload.status !== 404 && action.payload.data.result) {
        return {
          ...state,
          errors: { ...state.errors, fetch: action.payload.data.result },
        };
      } else {
        return {
          ...state,
          errors: { ...state.errors, fetch: "An error occured 😥" },
        };
      }
    }
    case actions.CREATE_WILDER: {
      if (action.payload.success) {
        return {
          ...state,
          wilders: [action.payload.result, ...state.wilders],
        };
      } else if (action.payload.status !== 404 && action.payload.data.result) {
        return {
          ...state,
          errors: { ...state.errors, post: action.payload.data.result },
        };
      } else {
        return {
          ...state,
          errors: { ...state.errors, post: "An error occured 😥" },
        };
      }
    }
    default: {
      return state;
    }
  }
};
