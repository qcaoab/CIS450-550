import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { BookModal } from "./Book/BookModal";
import SideBar from "./Sidebar";
import Content from "./Content";
import "../style/App.css";

export default () => {
  const [isOpen, setOpen] = useState(true);
  const toggle = () => setOpen(!isOpen);

  return (
    <div className="App">
      <BookModal />
      <Router>
        <div className="App wrapper">
          <SideBar toggle={toggle} isOpen={isOpen} />
          <Content toggle={toggle} isOpen={isOpen} />
        </div>
      </Router>
    </div>
  );
};
