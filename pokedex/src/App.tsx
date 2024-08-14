import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Items from "./pages/Items";
import Pokemon from "./pages/Pokemon";
import Pokemons from "./pages/Pokemons";

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/pokemons/:name" element={<Pokemon />} />
          <Route path="/pokemons" element={<Pokemons />} />
          <Route path="/items" element={<Items />} />
          <Route path="/" element={<Pokemons />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
