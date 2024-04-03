// import { Switch } from "react-router";
import "./App.css";
import AuthForm from "./components/AuthForm/AuthForm";
import LoginForm from "./components/AuthForm/Login/LoginForm";
import SignUp from "./components/AuthForm/SignUp/SignUp";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter,Switch,Route } from "react-router-dom/cjs/react-router-dom";
import UserHome from "./components/UserNav/Home/UserHome";


function App() {
  return (
    <BrowserRouter>
    <Switch>
      <Route path="/signup">
        <AuthForm />
      </Route>
      <Route path="/login">
        <AuthForm />
      </Route>
      <Route path="/userhome">
        <UserHome />
      </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
