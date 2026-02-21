import { useState } from "react";
import "./App.css";
import Experience from "./Experience/Experience";
import Border from "./components/Border/Border";
import ZoomSlider from "./components/ZoomSlider/ZoomSlider";

function App() {
  return (
    <>
      <ZoomSlider />
      <Border />
      <Experience />
    </>
  );
}

export default App;
