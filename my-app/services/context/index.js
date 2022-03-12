import { createContext, useContext, useReducer } from "react";
import { useEffect, useState, useMemo } from "react";
import { getAll, create, update, deleteById } from "../wilderAPICalls";
import { wildersReducer, initialState } from "./reducer";
import { useAsyncReducer } from "../hooks/useAsyncReducer";
import { actions } from "./actions";

export const WildersContext = createContext();

export const WildersProvider = ({ children }) => {
  const [state, dispatch] = useAsyncReducer(wildersReducer, initialState);
  const value = {
    wilders: state.wilders,
    errors: state.errors,
    getWilders: async () => {
      const data = await getAll();
      dispatch({ type: actions.GET_WILDERS, payload: data });
    },
    addWilder: async (newWilder) => {
      const data = await create(newWilder);
      dispatch({ type: actions.CREATE_WILDER, payload: data });
    },
  };
  return (
    <WildersContext.Provider value={value}>{children}</WildersContext.Provider>
  );
};

// const [wilders, setWilders] = useState([]);
// const [error, setError] = useState("");
// const fetchData = async () => {
//   try {
//     const response = await axios.get("http://localhost:8080/api/wilders");
//     setWilders(response.data.result);
//   } catch (error) {
//     console.log(error);
//   }
// };
// const postData = async (data) => {
//   try {
//     const response = await axios.post(
//       "http://localhost:8080/api/wilders",
//       data
//     );
//     const newWilder = response.data.result;
//     setWilders((prevWilders) => {
//       return [newWilder, ...prevWilders];
//     });
//   } catch (error) {
//     if (error.response && error.response.status != 404) {
//       setError(error.response.data.result);
//     } else {
//       setError("An error occured 😥");
//     }
//   }
// };

// if (action.payload.success) {
//         return {
//           ...state,
//           wilders: [...state.wilders, action.payload.result],
//         };
//       } else if (
//         action.payload.response &&
//         action.payload.response.status != 404
//       ) {
//         return {
//           ...state,
//           error: action.payload.response.data.result,
//           wilders: [],
//         };
//       } else {
//         return { ...state, error: "An error occured 😥", wilders: [] };
//       }
//     }

// const value = {
//   wilders: state.wilders,
//   error: state.error,
//   getWilders: async () => {
//     const data = await getAll();
//     dispatch({ type: actions.GET_WILDERS, payload: data });
//     console.log(state.wilders);
//   },
//   addWilder: async (newWilder) => {
//     const data = await create(newWilder);
//     dispatch({ type: actions.CREATE_WILDER, payload: newWilder });
//     console.log(state.wilders);
//   },
// };
