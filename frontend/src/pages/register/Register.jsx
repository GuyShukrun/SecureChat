import React from "react";
import { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./register.css";
import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";
import { storage } from "../../firebase/firebase.js";
export default function Register() {
  const email = useRef("");
  const password = useRef("");
  const fullname = useRef("");
  const navigate = useNavigate();

  const [profileImg, setProfileImg] = useState(null);

  const noAvatarUrl =
    "https://firebasestorage.googleapis.com/v0/b/chat-fe2b0.appspot.com/o/images%2FnoAvatar.png?alt=media&token=ea7cc780-ee0b-4377-9d1d-97ba3d128662";
  const handleFileInput = (e) => {
    setProfileImg(e.target.files[0]); //Take the first pic
  };
  const handleRegister = (e) => {
    e.preventDefault();
    if (profileImg) {
      const storageRef = ref(storage, `/images/${profileImg.name}`);
      const uploadTask = uploadBytesResumable(storageRef, profileImg);
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((url) => {
              let userCredentials = {
                email: email.current.value,
                password: password.current.value,
                fullname: fullname.current.value,
                profilePicture: url,
              };
              return axios.post(
                "http://localhost:8800/api/users/register",
                userCredentials
              );
            })
            .then((res) => {
              navigate("/login");
            })
            .catch((err) => alert("Something went wrong, please try again"));
        }
      );
    }

    // No profile image selected
    else {
      if (password.current.value.length < 6) {
        alert("Password length must be at least 6 characters");
        return;
      }
      if (fullname.current.value.length < 1) {
        alert("Full name length must be at least 1 character");
        return;
      }

      let userCredentials = {
        email: email.current.value,
        password: password.current.value,
        fullname: fullname.current.value,
        profilePicture: noAvatarUrl,
      };
      axios
        .post("http://localhost:8800/api/users/register", userCredentials)
        .then((res) => {
          navigate("/login");
        })
        .catch((err) => alert("Something went wrong, please try again"));
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
              alt=""
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
                  pattern=".{1,}"
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
                  pattern=".{6,}"
                />
                <small id="emailHelp" className="form-text text-muted">
                  Password length must be at least 6 characters.
                </small>
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
