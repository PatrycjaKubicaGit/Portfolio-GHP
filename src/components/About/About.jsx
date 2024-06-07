import React from "react";

import styles from "./About.module.css";
import { getImageUrl } from "../../utils";

export const About = () => {
  return (
    <section className={styles.container} id="about">
      <h2 className={styles.title}>O mnie</h2>
      <div className={styles.content}>
        <ul className={styles.aboutItems}>
          <li className={styles.aboutItem}>
            <div className={styles.aboutItemText}>
              <h3>Wykształcenie wyższe</h3>
              <p>
                Aktualnie jestem studentką na Uniwersytecie Bielsko-Bialskim na kierunku Infromatyka ze specjalnością Inżyniernia Oprogramowania.
              </p>
            </div>
          </li>
          <li className={styles.aboutItem}>
            <div className={styles.aboutItemText}>
              <h3>Wykształcenie techniczne</h3>
              <p>
                Uczęszczałam do Zespół Szkół im. gen. Stanisława Sosabowskiego w Bielsku-Białej, gdzie zdobyłam tytuł technika informatyka.
              </p>
            </div>
          </li>
          <li className={styles.aboutItem}>
            <div className={styles.aboutItemText}>
              <h3>Samouk</h3>
              <p>
              Wolę uczyć się samemu niż płacić za kursy, których zawartość można łatwo znaleźć w internecie.
              </p>
            </div>
          </li>
          <li className={styles.aboutItem}>
            <div className={styles.aboutItemText}>
              <h3>Zainteresowania</h3>
              <p>
              Interesuję się najnowszymi technologiami i ich wpływem na codzienne życie. Analizuję, jak mogą przyczynić się do ulepszania naszej codzienności lub stwarzać wyzwania. Moje zainteresowanie technologią napędza ciągłe dążenie do zrozumienia jej potencjału w kształtowaniu przyszłości. Dodatkowo, interesują mnie gry ARG, które łączą rzeczywistość z wirtualnym światem, oraz wpływ subtelnych detali w grach i filmach na odbiorców.
              </p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};
