import React, { useState, useContext } from "react";
import { DisplayMessage } from "./DisplayMessage";
import { WildersContext } from "../services/context/index";
import styles from "../styles/components/WilderForm.module.css";

export const WilderForm = () => {
  const [newWilder, setNewWilder] = useState({
    name: "",
    city: "",
  });
  const [skill, setSkill] = useState({
    title: "",
    votes: "",
  });
  const [skills, setSkills] = useState([]);
  const [formValidation, setFormValidation] = useState("");
  const { addWilder, wilders, errors } = useContext(WildersContext);
  const onSubmit = async (e) => {
    e.preventDefault();
    addWilder(newWilder);
    setNewWilder((prevState) => {
      return { ...prevState, name: "", city: "" };
    });
  };
  const onClick = () => {
    if (!skill.title || !skill.votes) {
      setFormValidation("You should enter a skill with a title and votes");
    } else {
      setSkills((prevState) => {
        return [...prevState, skill];
      });
      setSkill((prevState) => {
        return { ...prevState, title: "", votes: "" };
      });
    }
    console.log(skills);
    console.log(formValidation);
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <label htmlFor="name-input">Name :</label>
        <input
          id="name-input"
          type="text"
          placeholder="Type the name"
          value={newWilder.name}
          onChange={(e) =>
            setNewWilder((prevState) => {
              return { ...prevState, name: e.target.value };
            })
          }
          required
        ></input>
        <label htmlFor="city-input">City :</label>
        <input
          id="city-input"
          type="text"
          placeholder="Type the city"
          value={newWilder.city}
          onChange={(e) =>
            setNewWilder((prevState) => {
              return { ...prevState, city: e.target.value };
            })
          }
        ></input>
        <span className={styles.skills}>
          <span className={styles.skills_inputs}>
            <h3 className={styles.skills_h3}>Skills : </h3>
            <label htmlFor="skill-input" className={styles.skills_label}>
              Title :{" "}
            </label>
            <input
              id="skill-input"
              type="text"
              placeholder="Type your skills"
              value={skill.title}
              onChange={(e) =>
                setSkill((prevState) => {
                  return { ...skill, title: e.target.value };
                })
              }
            ></input>
            <label htmlFor="votes-select" className={styles.skills_label}>
              Votes :
            </label>
            <select
              name="votes"
              id="votes-select"
              value={skill.votes || ""}
              onChange={(e) =>
                setSkill((prevState) => {
                  return { ...skill, votes: e.target.value };
                })
              }
            >
              <option value="">-- Please choose an option--</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </span>
          <button
            type="button"
            onClick={onClick}
            className={styles.skills_button}
          >
            +
          </button>
        </span>
        <button type="submit">Add</button>
        {errors && errors.post ? (
          <DisplayMessage message={errors.post} />
        ) : null}
        {formValidation ? <DisplayMessage message={formValidation} /> : null}
      </form>
    </>
  );
};
