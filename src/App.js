import React from "react";
import { Route, BrowserRouter } from "react-router-dom";

import Home from "./components/Home";
import Form from "./components/Form";

function App() {
  return (
    <div className="root">
      <h1>Lambda Eats!</h1>
      <button>
        <BrowserRouter>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/order">
          <Form/>
        </Route>
        </BrowserRouter>
      </button>
    </div>
  );
};
export default App;
