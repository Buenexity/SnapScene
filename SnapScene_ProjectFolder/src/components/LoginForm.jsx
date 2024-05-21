import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LoginForm() {
  const navigate = useNavigate();
  const [createAccount, setCreateAccount] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  async function submit(e) {
    e.preventDefault();

    const baseURL = "http://localhost:5000/";
    const endpoint = createAccount ? "signup" : "login";
    const fullURL = baseURL + endpoint;

    try {
      const requestData = {
        email,
        password,
      };

      // Only include username if creating an account
      if (createAccount) {
        requestData.username = username;
      }

      const response = await axios.post(fullURL, requestData);

      // Log the response 
      console.log(response);

      if (!response.data || !response.data.token) {
        throw new Error("Invalid server response");
      }

      localStorage.setItem("token", response.data.token);
      navigate("/home");
    } catch (error) {
      alert(error.message || "Issue with password or Email");
    }
  }

  return (
    <section
      className="vh-100 d-flex justify-content-center align-items-center"
      style={{ backgroundColor: "white", borderRadius: "2.5%" }}
    >
      <div className="col-md-6 col-lg-7 d-flex align-items-center">
        <div className="card-body p-4 p-lg-5 text-black">
          <form onSubmit={submit}>
            <div className="d-flex align-items-center mb-3 pb-1">
              <i
                className="fas fa-cubes fa-2x me-3"
                style={{ color: "#ff6219" }}
              ></i>
              <div className="h1 fw-bold mb-0" style={{ marginLeft: "-18px" }}>
                SnapScene
              </div>
            </div>

            <h5
              className="fw-normal mb-3 pb-3"
              style={{ letterSpacing: "1px" }}
            >
              {createAccount ? "Create account" : "Sign into your account"}
            </h5>

            {createAccount && (
              <div data-mdb-input-init className="form-outline mb-4">
                <input
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  id="usernameInput"
                  className="form-control form-control-lg"
                />
                <label className="form-label" htmlFor="usernameInput">
                  Username
                </label>
              </div>
            )}

            <div data-mdb-input-init className="form-outline mb-4">
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                id="emailInput"
                className="form-control form-control-lg"
              />
              <label className="form-label" htmlFor="emailInput">
                Email address
              </label>
            </div>

            <div data-mdb-input-init className="form-outline mb-4">
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                id="passwordInput"
                className="form-control form-control-lg"
              />
              <label className="form-label" htmlFor="passwordInput">
                Password
              </label>
            </div>

            <div className="pt-1 mb-4">
              <button className="btn btn-dark btn-lg btn-block" type="submit">
                {createAccount ? "Create Account" : "Login"}
              </button>
            </div>

            <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
              {createAccount
                ? "Already have an Account:"
                : "Don't have an Account:"}
              <a
                onClick={() => setCreateAccount(!createAccount)}
                href="#!"
                style={{ color: "#393f81", marginLeft: "5px" }}
              >
                {createAccount ? "Sign In" : "Create Account"}
              </a>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default LoginForm;
