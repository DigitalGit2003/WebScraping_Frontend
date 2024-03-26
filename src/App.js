import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";

import Nav from "./components/Nav";
import Card from "./components/product/Card";
import Home from "./components/Home";
import Register from "./components/user/Register";
import Login from "./components/user/Login";
import Scraper from "./components/user/Scraper";


function App() {
  return (
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
  );
}

export default App;
