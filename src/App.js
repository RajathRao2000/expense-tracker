// import { Switch } from "react-router";
import "./App.css";
import AuthForm from "./components/AuthForm/AuthForm";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter,Switch,Route, Redirect } from "react-router-dom/cjs/react-router-dom";
import UserNav from "./components/UserNav/UserNav";



function App() {
  return (
    <BrowserRouter>
    <Switch>
      <Redirect from="/" to="/login" exact/>
      <Route path="/signup">
        <AuthForm />
      </Route>
      <Route path="/login">
        <AuthForm />
      </Route>
      <Route path="/user-nav">
        <UserNav />
      </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
