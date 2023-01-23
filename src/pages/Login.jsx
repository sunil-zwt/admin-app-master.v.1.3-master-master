import React, { useState, useEffect } from "react";
import "../css/login.css";
import image from "../images/login.jpg"
import axios from "axios";
import { useNavigate } from "react-router-dom"
import gif2 from "../images/11.gif"
function Login({ token, setToken }) {
  // const userRef = useRef()
  // const errRef = useRef();
  const navigate = useNavigate()
  const [input, setInput] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(true)
  const [errMsg, setErrMsg] = useState("");
  useEffect(() => {

  }, [])
  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });

    console.log("name", name, "value", value);
  };
  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(false)


    // console.log(userData)

    let response = axios("https://fakestoreapi.com/auth/login", {
      method: "POST",
      data: {
        username: input.username,
        password: input.password,
      },
    });
    response.then(res => {
      const accessToken = res?.data?.token;

      let users = axios('https://fakestoreapi.com/users/')

      users.then(res => {
        localStorage.setItem('users', JSON.stringify(res.data))

        let userData = JSON.parse(localStorage.getItem('users'))
        let _login = userData && userData.filter((data, id) => {
          if (data.username === input.username && data.password === input.password) {
            setToken(accessToken)
            localStorage.setItem("userToken", accessToken);
            setLoading(false)
            navigate("/")
            return data
          }

        }
        )
        localStorage.setItem('users', JSON.stringify(_login))

      })

    }).catch((err) => {
        if (!err?.response) {
          setErrMsg("No Server Response");
          setLoading(true)
        } else if (err.response.data?.status === 400) {
          setErrMsg("Missing Username or Password");
          setLoading(true)
        } else if (err.response.data?.status === 401) {
          setErrMsg("Unauthorized");
          setLoading(true)
        } else {
          setErrMsg("Login Failed");
          setLoading(true)
        }
      });




    // let response = axios("https://fakestoreapi.com/auth/login", {
    //   method: "POST",
    //   data: {
    //     username: input.username,
    //     password: input.password,
    //   },
    // });
    // response
    //   .then((res) => {
    //     const accessToken = res?.data?.token;
    //     console.log(accessToken)
    //     setToken(accessToken);
    //     localStorage.setItem("userToken", accessToken);
    //     setLoading(false)
    //     navigate("/")
    //   })
    //   .catch((err) => {
    //     if (!err?.response) {
    //       setErrMsg("No Server Response");
    //       setLoading(true)
    //     } else if (err.response.data?.status === 400) {
    //       setErrMsg("Missing Username or Password");
    //       setLoading(true)
    //     } else if (err.response.data?.status === 401) {
    //       setErrMsg("Unauthorized");
    //       setLoading(true)
    //     } else {
    //       setErrMsg("Login Failed");
    //       setLoading(true)
    //     }
    //   });
  };
  return (
    <div className="container">
      <form className="form">
        <div className="login-container">
          <img src={image} alt="logo" className="logo-image" />

          <div className="input-text">
            <label htmlFor="username">User Name</label>
            <input
              type={"text"}
              name={"username"}
              placeholder={"Enter User Name"}
              value={input.username}
              onChange={handleInput}
            />
          </div>
          <div className="input-text">
            <label htmlFor="password">Password</label>
            <input
              type={"password"}
              name={"password"}
              placeholder={"Enter Password"}
              value={input.password}
              onChange={handleInput}
            />
          </div>
        </div>
        {errMsg && <small>{errMsg}</small>}

        {loading ? <button onClick={handleLogin} className="login-btn">Login</button> : <img src={gif2} className="login-btn" />}


      </form>

    </div>
  );
}

export default Login;
