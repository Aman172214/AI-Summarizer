import React from "react";
import "./App.css";
import Description from "./components/Header";
import Demo from "./components/Form";

const App = () => {
  return (
    <main>
      <div className="main">
        <div className="gradient"></div>
      </div>
      <div className="app">
        <Description />
        <Demo />
      </div>
    </main>
  );
};

export default App;
