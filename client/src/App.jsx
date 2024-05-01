import React from "react";
import RouterIndex from "./routes/RouterIndex";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <RouterIndex />
      </Router>
    </>
  );
}

export default App;
