import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";

import { createContext, useContext, useState, useEffect } from "react";
import Nav from "./components/Nav";
import Card from "./components/product/Card";
import Home from "./components/Home";
import Register from "./components/user/Register";
import Login from "./components/user/Login";
import Scraper from "./components/user/Scraper";

export const LoginContext = createContext(); // For login status
export const ProductContext = createContext(); // For product data

function App() {
  const BASE_URI = process.env.REACT_APP_API_URI;

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

  /* For Manage LoginContext *
   *
   */

  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("access_token") ? true : false
  );

  function changedLoggedIn(value) {
    setLoggedIn(value);
    if (value === false) {
      localStorage.clear();
    }
  }

  /* For Manage ProductContext *
   *
   */

  const [data, setData] = useState([]);

  return (
    <LoginContext.Provider value={[loggedIn, changedLoggedIn]}>
      <ProductContext.Provider value={[data, setData]}>
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
      </ProductContext.Provider>
    </LoginContext.Provider>
  );
}

export default App;
