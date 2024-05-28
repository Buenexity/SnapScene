import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LoginForm({ setUser, user }) {
  const navigate = useNavigate();
  const [createAccount, setCreateAccount] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [token, setToken] = useState("");


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

      //Only include username if creating an account
      if (createAccount) {
        requestData.username = username;
      }

      //create post request to server
      const response = await axios.post(fullURL, requestData);

      console.log(response);

      if (!response.data || !response.data.token) {
        throw new Error("Invalid server response");
      }

      // Set the user and token in sessionStorage
      sessionStorage.setItem("user", JSON.stringify(response.data.user));
      sessionStorage.setItem("token", response.data.token);

      setUser(response.data.user);
      setToken(response.data.token);

      // Redirect to home page only on successful login/signup
      navigate("/home", { state: { user: response.data.user } });
    } catch (error) {
      // Handle errors
      console.error(error);
      alert(error.message || "Issue with password or Email");
    }
  }

  return (
    <section className="vh-100 gradient-custom">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div
              className="card text-white"
              style={{
                borderRadius: "1rem",
                backgroundColor: "rgba(0, 0, 0, 0.3)",
              }}
            >
              <div className="card-body p-5 text-center">
                <div className="mb-md-5 mt-md-4 pb-5">
                  <h2 className="fw-bold mb-2 text-uppercase">
                    {createAccount ? "Create account" : "Login"}
                  </h2>
                  <p className="text-white-50 mb-5">
                    Please enter your{" "}
                    {createAccount
                      ? "details to sign up"
                      : "login and password"}
                  </p>

                  {createAccount && (
                    <div className="mb-4">
                      <input
                        onChange={(e) => setUsername(e.target.value)}
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Username"
                      />
                    </div>
                  )}

                  <div className="mb-4">
                    <input
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      className="form-control form-control-lg"
                      placeholder="Email address"
                    />
                  </div>

                  <div className="mb-4">
                    <input
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      className="form-control form-control-lg"
                      placeholder="Password"
                    />
                  </div>

                  <button
                    className="btn btn-outline-light btn-lg px-5"
                    type="submit"
                    onClick={submit}
                  >
                    {createAccount ? "Create Account" : "Login"}
                  </button>
                </div>

                <div>
                  <p className="mb-0">
                    {createAccount
                      ? "Already have an account?"
                      : "Don't have an account?"}
                    <a
                      href="#!"
                      className="text-white-50 fw-bold"
                      onClick={() => setCreateAccount(!createAccount)}
                    >
                      {createAccount ? "Login" : "Create Account"}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginForm;
