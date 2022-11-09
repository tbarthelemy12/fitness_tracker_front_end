import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { useAuth } from "./custom-hooks";
import {
  Title,
  Nav,
  Routines,
  Activities,
  LoginOrRegister,
  MyRoutines,
  AddRoutine,
  EditActivity,
  EditRoutine,
  AddActivity,
} from "./components";

function App() {
  const { isLoggedIn } = useAuth();

  return (
    <Router>
      <Title />

      <Nav />

      <Switch>
        {}
        {!isLoggedIn && (
          <>
            {}

            <Route path="/routines" component={Routines} />

            <Route path="/activities" component={Activities} />

            <Route path="/login" component={LoginOrRegister} />

            <Route path="/register" component={LoginOrRegister} />
          </>
        )}

        {}
        {isLoggedIn && (
          <>
            {}

            <Route path="/routines" component={Routines} />

            <Route path="/myroutines" component={MyRoutines} />

            <Route path="/newroutine" component={AddRoutine} />

            <Route path="/editroutine" component={EditRoutine} />

            <Route path="/activities" component={Activities} />

            <Route path="/editactivity" component={EditActivity} />

            <Route path="/addactivity" component={AddActivity} />
          </>
        )}

        {}
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;