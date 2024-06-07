import React from "react";

import styles from "./Hero.module.css";
import { getImageUrl } from "../../utils";

export const Hero = () => {
  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Pratycja&nbsp;Kubica</h1>
        <p className={styles.description}>
        Studiuję informatykę na Uniwersytecie Bielsko-Bialskim, 
        zdobywając wiedzę z różnych dziedzin tej dynamicznej nauki. <br></br>
        Jeśli chcesz dowiedziec się więcej
        </p>
        <a href="mailto:patrycjak9801@gmail.com" className={styles.contactBtn}>
          Napisz do mnie
        </a>
      </div>
      <img
        src={getImageUrl("profilowe/profilowe.png")}
        alt="Zdjęcie"
        className={styles.profileImg}
      />
      <div className={styles.topBlur} />
      <div className={styles.bottomBlur} />
    </section>
  );
};
