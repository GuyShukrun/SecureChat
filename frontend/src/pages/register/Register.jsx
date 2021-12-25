import React from "react";
import { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./register.css";
export default function Register() {
  const email = useRef("");
  const password = useRef("");
  const fullname = useRef("");
  const navigate = useNavigate();

  const [profileImg, setProfileImg] = useState(null);

  const handleFileInput = (e) => {
    setProfileImg(e.target.files[0]); //Take the first pic
  };
  const handleRegister = (e) => {
    e.preventDefault();
    console.log(profileImg);
    console.log(fullname.current.value);
    console.log(email.current.value);
    console.log(password.current.value);

    const formData = new FormData();
    // Appending all the key-value pairs for registration test
    formData.append("profileImg", profileImg);
    formData.append("email", email.current.value);
    formData.append("fullname", fullname.current.value);
    formData.append("password", password.current.value);

    axios
      .post("http://localhost:8800/api/users/register", formData, {})
      .then((res) => {
        navigate("/login");
        // console.log(res);
      });

    // e.target.classList.add("disabled");
    // // loginCall(
    // //   { email: email.current.value, password: password.current.value },
    // //   dispatch
    // // );
    // let userCredentials = {
    //   email: email.current.value,
    //   password: password.current.value,
    // };
    // try {
    //   axios
    //     .post("http://localhost:8800/api/users/login", userCredentials)
    //     .then((res) => {
    //       localStorage.setItem("user", JSON.stringify(res.data));
    //       setUser(res.data);
    //     });
    // } catch (err) {
    //   console.log(err);
    // }
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
            <h1 className="text-center loginLogo">Register</h1>
            <form onSubmit={handleRegister}>
              <div className="form-group mt-4">
                <label className="mb-1">Full name *</label>
                <input
                  type="text"
                  ref={fullname}
                  className="form-control"
                  placeholder="Full name"
                />
              </div>
              <div className="form-group mt-2">
                <label className="mb-1">Email address *</label>
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
                <label className="mb-1">Password *</label>
                <input
                  type="password"
                  ref={password}
                  className="form-control"
                  placeholder="Password"
                />
              </div>
              <div class="form-group mt-2">
                <label className="mb-2">Choose Profile Picture</label>
                <input
                  type="file"
                  accept="image/*"
                  className="form-control"
                  onChange={handleFileInput}
                />
              </div>
              <button type="submit" className="btn btn-primary mt-4">
                Register
              </button>
              <p className="notRegisteredYet mt-3">
                Already have an Account?
                <a
                  className="text-decoration-none"
                  style={{ color: "#6441a5" }}
                  href="http://localhost:3000/login"
                >
                  {" "}
                  Login now
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
