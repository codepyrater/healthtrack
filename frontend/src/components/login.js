import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';
import axios from "axios";
import { toast } from "react-toastify";

import Image from "../components/assests/image.png";

import { FaEye, FaEyeSlash } from "react-icons/fa6";

import "../components/styles/login.css";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext);

  const handleLogin = async (event) => {
    event.preventDefault();

    if (email.length > 0 && password.length > 0) {
      const formData = {
        email,
        password,
      };

      try {
        const response = await axios.post(
          "http://localhost:5000/api/users/login",
          formData
        );

        if (response.status >= 200 && response.status < 300) {
          const data = response.data;
          setAuth({ token: data.token, isAuthenticated: true, user: data.user });
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', data.user);
          localStorage.setItem('userId', data.userId);
          toast.success("Login successful");
         
        } else {
          // eslint-disable-next-line no-undef
          toast.error(data.message);
        }
      } catch (err) {
        console.log(err);
        toast.error(err.message);
      }
    } else {
      toast.error("Please fill all inputs");
    }

  navigate('/dashboard');
  };

  const token = JSON.parse(localStorage.getItem("auth")) || "";

  useEffect(() => {
    if (token !== "") {
      toast.success("You are already logged in");
      navigate("/dashboard");
    }
  }, []);

  return (
    <div className="login-main">
      <div className="login-left">
        <img src={Image} alt="" />
      </div>
      <div className="login-right">
        <div className="login-right-container">
         
          <div className="login-center">
            <h2>Welcome back!</h2>
            <p>Please enter your details</p>
            <form onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="pass-input-div">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {showPassword ? (
                  <FaEyeSlash
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  />
                ) : (
                  <FaEye
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  />
                )}
              </div>
              <div className="login-center-options">
                <div className="remember-div">
                  <input type="checkbox" id="remember-checkbox" />
                  <label htmlFor="remember-checkbox">Remember for 30 days</label>
                </div>
              
              </div>
              <div className="login-center-buttons">
                <button type="submit">Log In</button>
                <button type="submit">
                
                </button>
              </div>
            </form>
          </div>
          <p className="login-bottom-p">
            Don't have an account? <Link to="/register">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;