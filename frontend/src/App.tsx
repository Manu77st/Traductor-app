import { useState } from "react";
import "./App.css";
import WordForm from "./components/WordForm";
import WordList from "./components/WordList";
import WordSearch from "./components/WordSearch";

export default function App() {
  const [refresh, setRefresh] = useState(false);

  const handleWordAdded = () => setRefresh(!refresh);

  return (
    <div className="container">
      <h1>Traducto Manu</h1>

      <WordForm onWordAdded={handleWordAdded} />
      <hr />

      <WordSearch />
      <hr />

      <WordList key={refresh ? "1" : "0"} />
    </div>
  );
}
