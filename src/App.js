// import { Switch } from "react-router";
import "./App.css";
import AuthForm from "./components/AuthForm/AuthForm";
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect,
} from "react-router-dom/cjs/react-router-dom";

import Header from "./components/UI/Header/Header";
import Body from "./components/UI/Body.js/Body";
import UserProfile from "./components/UserNav/UserProfile/UserProfile";
import UpdateProfile from "./components/UserNav/UpdateProfile/UpdateProfile";
import ExpenseTracker from "./components/UserNav/ExpenseTracker/ExpenseTracker";
import VerifyEmail from "./components/UserNav/VerifyEmail/VerifyEmail";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Body>
        <Switch>
          <Redirect from="/" to="/login" exact />
          <Route path="/signup">
            <AuthForm />
          </Route>
          <Route path="/login">
            <AuthForm />
          </Route>
          <Route path={`/profile`}>
            <UserProfile />
          </Route>
          <Route path={`/update-profile`}>
            <UpdateProfile />
          </Route>
          <Route path={`/expense-tracker`}>
            <ExpenseTracker />
          </Route>
          <Route path={`/verify-email`}>
            <VerifyEmail />
          </Route>
        </Switch>
      </Body>
    </BrowserRouter>
  );
}

export default App;
