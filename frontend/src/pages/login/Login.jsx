import React, { useRef } from "react";
import "./login.css";
import { loginCall } from "../../apiCalls";
import { CircularProgress } from "@mui/material";
import axios from "axios";
export default function Login({ user, setUser }) {
  // Using useRef will not cause rerender our all page when user submit a letter
  // const { user, isFetching, error, dispatch } = useContext(AuthContext);
  const email = useRef("");
  const password = useRef("");
  const handleLogin = (e) => {
    e.preventDefault();
    e.target.classList.add("disabled");
    // loginCall(
    //   { email: email.current.value, password: password.current.value },
    //   dispatch
    // );
    let userCredentials = {
      email: email.current.value,
      password: password.current.value,
    };
    try {
      axios
        .post("http://localhost:8800/api/users/login", userCredentials)
        .then((res) => {
          localStorage.setItem("user", JSON.stringify(res.data));
          setUser(res.data);
        });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="vh-100">
      <div className="container h-100 w-100 d-flex justify-content-center align-items-center">
        <div className="row ">
          <div className="col ">
            <h1 class="logo text-center mb-5 mt-5">SecureChat</h1>
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="img-fluid"
            />
          </div>
          <div className="col ">
            <h1 className="text-center loginLogo">Login</h1>
            <form onSubmit={handleLogin}>
              <div className="form-group mt-5">
                <label className="mb-1">Email address</label>
                <input
                  type="email"
                  className="form-control "
                  ref={email}
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                />
                <small id="emailHelp" className="form-text text-muted">
                  We'll never share your email with anyone else.
                </small>
              </div>
              <div className="form-group mt-2">
                <label className="mb-1">Password</label>
                <input
                  type="password"
                  ref={password}
                  className="form-control"
                  placeholder="Password"
                />
              </div>
              <button type="submit" className="btn btn-primary mt-4">
                Login
              </button>
              <p className="notRegisteredYet mt-5">
                Not registered yet?
                <a
                  className="text-decoration-none"
                  style={{ color: "#6441a5" }}
                  href="http://localhost:3000/register"
                >
                  {" "}
                  Create an Account
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
