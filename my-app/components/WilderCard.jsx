import React, { useState } from "react";
import Image from "next/image";
import blank_profil from "../public/blank_profil.png";
import styles from "../styles/components/WilderCard.module.css";
import { Skill } from "./Skill";
import { useContext } from "react";
import { WildersContext } from "../services/context/index";
import { InlineEdit } from "./InlineEdit";

export const WilderCard = ({ name, city, skills, id }) => {
  const { deleteWilder, updateWilder } = useContext(WildersContext);
  const [editMode, setEditMode] = useState(false);
  const [newSkills, setNewSkills] = useState(skills);
  const onDelete = (e) => {
    const id = e.target.parentElement.id;
    if (window.confirm("Do you want to delete this wilder ?")) {
      deleteWilder(id);
    } else return;
  };
  return (
    <>
      <article className={styles.card} id={id}>
        <button className={styles.action_button} onClick={onDelete}>
          X
        </button>
        <Image src={blank_profil} alt="Jane Doe Profil" />
        <InlineEdit
          value={name}
          classes="editable_title"
          onCallback={(data, id) => {
            updateWilder({ name: data }, id);
          }}
          id={id}
        />
        <InlineEdit
          value={city}
          onCallback={(data) => {
            updateWilder({ city: data }, id);
          }}
          id={id}
        />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
        <span className={styles.skills_wrapper}>
          <h4>Wild Skills</h4>
          <button className={styles.action_button}>🖍</button>
        </span>
        <ul className={styles.skills}>
          {skills && skills.length > 0
            ? skills.map((skill) => (
                <Skill
                  key={skill._id}
                  title={skill.title}
                  votes={skill.votes}
                />
              ))
            : null}
        </ul>
      </article>
    </>
  );
};
