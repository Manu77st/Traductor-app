import { useState } from "react";
import { buscarPalabra } from "../api/wordsApi";

interface Word {
  id: number;
  word_es: string;
  word_en: string;
}

export default function WordSearch() {
  const [term, setTerm] = useState("");
  const [results, setResults] = useState<Word[]>([]);
  const [searching, setSearching] = useState(false);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!term.trim()) {
      alert("Escribe algo para buscar :)");
      return;
    }

    setSearching(true);
    try {
      const data = await buscarPalabra(term);
      setResults(data);
    } catch (err) {
      setResults([]);
      alert("No se encontraron resultados");
    } finally {
      setSearching(false);
    }
  }

  return (
    <div className="card">
      <h2 className="section-title">
        <span className="section-icon">🔍</span>
        Buscar Palabra
      </h2>

      <form onSubmit={handleSearch}>
        <div className="search-container">
          <input
            type="text"
            placeholder="Buscar en español o inglés..."
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            className="form-input search-input"
          />
          <button
            type="submit"
            disabled={searching}
            className="btn btn-search"
          >
            {searching ? "..." : "Buscar"}
          </button>
        </div>
      </form>

      {results.length > 0 && (
        <div className="search-results">
          <p className="results-count">
            {results.length} resultado{results.length !== 1 ? "s" : ""} encontrado{results.length !== 1 ? "s" : ""}
          </p>
          <div className="results-list">
            {results.map((word) => (
              <div key={word.id} className="result-item">
                <span className="result-text">
                  <span className="word-text-bold">{word.word_es}</span>
                  <span className="word-arrow">→</span>
                  <span className="word-text-bold">{word.word_en}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}