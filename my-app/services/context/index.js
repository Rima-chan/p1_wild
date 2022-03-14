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
    updateWilder: async (updatedWilder, id) => {
      await update(id, updatedWilder);
      const data = await getAll();
      dispatch({ type: actions.GET_WILDERS, payload: data });
    },
    deleteWilder: async (id) => {
      const data = await deleteById(id);
      dispatch({ type: actions.DELETE_WILDER, payload: { data, id } });
    },
  };
  return (
    <WildersContext.Provider value={value}>{children}</WildersContext.Provider>
  );
};
