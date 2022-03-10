import { createContext, useContext } from "react";
import { useEffect, useState } from "react";
import axios from "axios";

export const WildersContext = createContext();

export const WildersProvider = ({ children }) => {
  const [wilders, setWilders] = useState([]);
  const [error, setError] = useState("");
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/wildqsers");
      setWilders(response.data.result);
      console.log(wilders);
    } catch (error) {
      console.log(error);
    }
  };
  const postData = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/wilders",
        data
      );
      const newWilder = response.data.result;
      setWilders((prevWilders) => {
        return [newWilder, ...prevWilders];
      });
    } catch (error) {
      if (error.response && error.response.status != 404) {
        setError(error.response.data.result);
      } else {
        setError("An error occured 😥");
      }
    }
  };
  return (
    <WildersContext.Provider
      value={{
        wilders,
        setWilders,
        fetchData,
        postData,
        error,
        setError,
      }}
    >
      {children}
    </WildersContext.Provider>
  );
};

export const useWildersContext = () => {
  return useContext(WildersContext);
};
