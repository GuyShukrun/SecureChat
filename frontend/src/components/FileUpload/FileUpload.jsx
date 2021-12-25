import React, { Component } from "react";
import axios from "axios";

export default class FileUpload extends Component {
  constructor(props) {
    super(props);

    this.onFileChange = this.onFileChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      profileImg: "",
    };
  }

  onFileChange(e) {
    this.setState({ profileImg: e.target.files[0] });
  }

  onSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    // Appending all the key-value pairs for registration test
    formData.append("profileImg", this.state.profileImg);
    formData.append("email", "testReact@test.com");
    formData.append("fullname", "Test React");
    formData.append("password", "12345678");

    axios
      .post("http://localhost:8800/api/users/register", formData, {})
      .then((res) => {
        console.log(res);
      });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              <input type="file" onChange={this.onFileChange} />
            </div>
            <div className="form-group">
              <button className="btn btn-primary" type="submit">
                Upload
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
