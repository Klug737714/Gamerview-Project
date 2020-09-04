import React, { Component } from "react";
import "./App.css";
import Home from "./components/home";
import About from "./components/about";
import SignIn from "./components/signin";
import SignUp from "./components/signup";
import Logout from "./components/logout";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import NavbarHome from "./components/navbar-home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import userService from "./services/userService";
import { Switch, Route } from "react-router-dom";
import MyPosts from "./components/myposts";
import CreatePost from "./components/create-post";
import EditPost from "./components/edit-post";
import ProtectedRoute from "./components/common/protected-route";
import Favorites from "./components/favorites";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = userService.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <header>
          <ToastContainer />
          <Switch>
            <Route
              exact
              path="/"
              render={(routeProps) => (
                <NavbarHome {...routeProps} user={user} />
              )}
            />
            <Route
              path="/"
              render={(routeProps) => <Navbar {...routeProps} user={user} />}
            />
          </Switch>
        </header>
        <main style={{ minHeight: "870px" }}>
          <Switch>
            <ProtectedRoute exact path="/my-posts" component={MyPosts} />
            <ProtectedRoute path="/my-posts/edit/:id" component={EditPost} />
            <ProtectedRoute path="/favorited" component={Favorites} />
            <ProtectedRoute path="/create-post" component={CreatePost} />
            <Route
              path="/"
              exact
              render={(routeProps) => <Home {...routeProps} user={user} />}
            />
            <Route path="/about" component={About} />
            <Route path="/user/signin" component={SignIn} />
            <Route path="/user/signup" component={SignUp} />
            <Route path="/user/logout" component={Logout} />
          </Switch>
        </main>
        <footer>
          <Footer />
        </footer>
      </React.Fragment>
    );
  }
}

export default App;
