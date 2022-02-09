import { useEffect, useRef, useState } from "react";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Chat from "./pages/chat/Chat";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { getUserByToken } from "./apiCalls";

function App() {
  const [user, setUser] = useState(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const getLoggedInUser = async () => {
      const loggedInUserToken = localStorage.getItem("token");
      if (loggedInUserToken) {
        const foundUser = await getUserByToken(loggedInUserToken);
        setUser(foundUser.data);
      }
      setShow(true);
    };

    getLoggedInUser();
  }, []);

  if (!show) return null;
  else
    return (
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              user ? (
                <Chat user={user} setUser={setUser} />
              ) : (
                <Navigate to="/login" />
              )
            }
          ></Route>
          <Route
            path="/register"
            element={!user ? <Register /> : <Navigate to="/" />}
          />
          <Route
            path="/login"
            element={
              !user ? (
                <Login user={user} setUser={setUser} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
      </Router>
    );
}

export default App;
