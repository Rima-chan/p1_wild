import React, { useState, useContext } from "react";
import axios from "axios";
import { DisplayMessage } from "./DisplayMessage";
import { WildersContext } from "../context";

export const WilderForm = () => {
  const [newWilder, setNewWilder] = useState({
    name: "",
    city: "",
    skill: [],
  });
  const { postData, error } = useContext(WildersContext);
  const onSubmit = async (e) => {
    e.preventDefault();
    postData(newWilder);
    console.log(error);
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <label htmlFor="name-input">Name :</label>
        <input
          id="name-input"
          type="text"
          placeholder="type the name"
          value={newWilder.name}
          onChange={(e) => setNewWilder({ ...newWilder, name: e.target.value })}
          required
        ></input>
        <label htmlFor="city-input">City :</label>
        <input
          id="city-input"
          type="text"
          placeholder="type the city"
          value={newWilder.city}
          onChange={(e) => setNewWilder({ ...newWilder, city: e.target.value })}
        ></input>
        <button>Add</button>
        {error ? <DisplayMessage message={error} /> : null}
      </form>
    </>
  );
};
