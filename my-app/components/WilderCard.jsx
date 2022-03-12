import React from "react";
import Image from "next/image";
import blank_profil from "../public/blank_profil.png";
import styles from "../styles/components/WilderCard.module.css";
import { Skill } from "./Skill";

export const WilderCard = ({ name, city, skills }) => {
  return (
    <article className={styles.card}>
      <Image src={blank_profil} alt="Jane Doe Profile" />
      <h3>{name}</h3>
      <h4>{city}</h4>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
      <h4>Wild Skills</h4>
      <ul className={styles.skills}>
        {skills && skills.length > 0
          ? skills.map((skill) => (
              <Skill key={skill.id} title={skill.title} votes={skill.votes} />
            ))
          : null}
      </ul>
    </article>
  );
};
