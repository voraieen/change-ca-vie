import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import IBookApp from "./components/IBookApp";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<IBookApp />} />
          <Route path="/step/:stepId" element={<IBookApp />} />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

export default App;