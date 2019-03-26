import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Hello from "./hello";
import Login from "./login";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="container">
          <Switch>
            <Route path="/" component={Hello} exact />
            <Route path="/login" component={Login} exact/>
          </Switch>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
