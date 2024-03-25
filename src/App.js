import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";

import Nav from "./components/Nav";
import Card from "./components/product/Card";
import Home from "./components/Home";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/home" element={<Card />} />
        <Route path="/" element={<Home />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
