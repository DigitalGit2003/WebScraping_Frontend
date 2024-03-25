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

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/home" element={<Card />} />
        <Route path="/" element={<Register />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
