import { actions } from "./actions";

export const initialState = {
  wilders: [],
  errors: {},
};

const errorMessage = "An error occured 😥";

export const wildersReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_WILDERS: {
      if (action.payload.success) {
        console.log(action.payload.result);
        return {
          ...state,
          wilders: action.payload.result,
          errors: {},
        };
      } else if (action.payload.status !== 404 && action.payload.data.result) {
        return {
          ...state,
          errors: { ...state.errors, fetch: action.payload.data.result },
        };
      } else {
        return {
          ...state,
          errors: { ...state.errors, fetch: errorMessage },
        };
      }
    }
    case actions.CREATE_WILDER: {
      if (action.payload.success) {
        return {
          ...state,
          wilders: [action.payload.result, ...state.wilders],
          errors: {},
        };
      } else if (action.payload.status !== 404 && action.payload.data.result) {
        return {
          ...state,
          errors: { ...state.errors, post: action.payload.data.result },
        };
      } else {
        return {
          ...state,
          errors: { ...state.errors, post: errorMessage },
        };
      }
    }
    case actions.UPDATE_WILDER: {
      return {
        ...state,
        wilders: action.payload.result,
      };
    }
    case actions.DELETE_WILDER: {
      if (action.payload.data.success) {
        return {
          ...state,
          wilders: [
            ...state.wilders.filter(
              (wilder) => wilder._id !== action.payload.id
            ),
          ],
          errors: {},
        };
      } else {
        return {
          ...state,
          errors: { ...state.errors, delete: errorMessage },
        };
      }
    }
    default: {
      return state;
    }
  }
};
