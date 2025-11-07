import { useState } from "react";
import "./App.css";
import WordForm from "./components/WordForm";
import WordList from "./components/WordList";
import WordSearch from "./components/WordSearch";

export default function App() {
  const [refresh, setRefresh] = useState(false);

  const handleWordAdded = () => setRefresh(!refresh);

  return (
    <div className="app-container">
      <div className="app-wrapper">
        <div className="app-header">
          <h1 className="app-title">📚 Traductor Manu</h1>
          <p className="app-subtitle">Tu diccionario personal español-inglés</p>
        </div>

        <div className="sections-container">
          <WordForm onWordAdded={handleWordAdded} />
          <WordSearch />
          <WordList key={refresh ? "1" : "0"} />
        </div>
      </div>
    </div>
  );
}