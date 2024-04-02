import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";

import { createContext, useContext, useState, useEffect} from "react";
import Nav from "./components/Nav";
import Card from "./components/product/Card";
import Home from "./components/Home";
import Register from "./components/user/Register";
import Login from "./components/user/Login";
import Scraper from "./components/user/Scraper";

export const LoginContext = createContext();

function App() {
  const BASE_URI = "http://127.0.0.1:5050";

  useEffect(() => {
    function refreshTokens() {
      if (localStorage.refresh) {
        const url = `${BASE_URI}/auth/refresh`;
        fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            refresh: localStorage.refresh_token,
          }),
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            localStorage.access_token = data.access_token;
            setLoggedIn(true);
          });
      }
    }

    const minute = 1000 * 60;
    refreshTokens();
    setInterval(refreshTokens, minute * 3);
  }, []);

  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("access_token") ? true : false
  );

  function changedLoggedIn(value) {
    setLoggedIn(value);
    if (value === false) {
      localStorage.clear();
    }
  }

  return (
    <LoginContext.Provider value={[loggedIn, changedLoggedIn]}>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<h1>Hello, </h1>} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/scraper" element={<Scraper />} />
        </Routes>
      </BrowserRouter>
    </LoginContext.Provider>
  );
}

export default App;
