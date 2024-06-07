import React, { useState, useEffect } from 'react';
import styles from "./App.module.css";
import { About } from "./components/About/About";
import { Contact } from "./components/Contact/Contact";
import { Experience } from "./components/Experience/Experience";
import { Hero } from "./components/Hero/Hero";
import { Navbar } from "./components/Navbar/Navbar";
import { Projects } from "./components/Projects/Projects";
import Skills from "./components/Skills/Skills";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SceneGraph from "./components/Graphics/SceneGraph";
import Graphics from "./components/Projects/Graphics";


function HomePage() {
  return(
    <>
     <Hero />
      <About />
      <Experience />
      <Skills/>
      <Contact/>
    </>
  );
}

function AllProjects(){
  return(
    <>
      <Projects />
      <Graphics/>
      <Contact/>
    </>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); 
    }, 100);

    return () => clearTimeout(timer); 
  }, []);
  return (
    <Router>
      <div className={styles.App}>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<AllProjects />} />
          <Route path="/Scene" element = {<SceneGraph/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
