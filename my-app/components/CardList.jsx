import React from "react";
import { WilderCard } from "./WilderCard";
import { WildersContext } from "../context";
import { useEffect, useContext } from "react";

export const CardList = () => {
  const { wilders, setWilders, fetchData } = useContext(WildersContext);
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <main className="container">
      <h2>Wilders</h2>
      <section className="card-row">
        {wilders.map((wilder, index) => (
          <WilderCard
            key={`${wilder.name}-${index}`}
            name={wilder.name}
            city={wilder.city}
            skills={wilder.skills}
          />
        ))}
      </section>
    </main>
  );
};
