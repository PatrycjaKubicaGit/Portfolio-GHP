import React from 'react';
import { Link } from 'react-router-dom'; 
import logoSVG from './logo.svg';
import styles from "./Projects.module.css";
const Graphics= () => {
  return (
    <div className={styles.container}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ marginRight: '20px' }}>
        <img src={logoSVG} alt="SVG Graphic" width="300" height="300" />
        </div>
        <div>
          <h3 className={styles.title} ><Link to="/Scene">Animacja wiatraków za pomocą Canvas</Link></h3>
        </div>
      </div>
    </div>
  );
};

export default Graphics;
