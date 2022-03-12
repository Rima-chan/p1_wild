import React, { useState } from "react";
import { WilderCard } from "./WilderCard";
import { WildersContext } from "../services/context/index";
import { useEffect, useContext } from "react";
import { DisplayMessage } from "./DisplayMessage";

export const CardList = () => {
  const { wilders, errors, getWilders } = useContext(WildersContext);
  useEffect(() => {
    (async () => {
      await getWilders();
    })();
  }, []);
  return (
    <main className="container">
      <h2>Wilders</h2>
      {errors && errors.fetch ? (
        <DisplayMessage message={errors.fetch} />
      ) : null}
      <section className="card-row">
        {wilders.length > 0 ? (
          wilders.map((wilder, index) => (
            <WilderCard
              key={`${wilder.name}-${index}`}
              name={wilder.name}
              city={wilder.city}
              skills={wilder.skills}
            />
          ))
        ) : !errors ? (
          <div>Aucun Wilder pour le moment 🐓</div>
        ) : null}
      </section>
    </main>
  );
};
