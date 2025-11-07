import { useState } from "react";
import { crearPalabra } from "../api/wordsApi";

interface Props {
  onWordAdded: () => void;
}

export default function WordForm({ onWordAdded }: Props) {
  const [wordEs, setWordEs] = useState("");
  const [wordEn, setWordEn] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!wordEs.trim() || !wordEn.trim()) {
      alert("Por favor llena ambos campos");
      return;
    }
    setLoading(true);
    try {
      await crearPalabra(wordEs, wordEn);
      setWordEs("");
      setWordEn("");
      onWordAdded();
    } catch (error) {
      console.error(error);
      alert("Error al guardar la palabra");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card">
      <h2 className="section-title">
        <span className="section-icon">➕</span>
        Agregar Nueva Palabra
      </h2>
      
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-grid">
          <input
            type="text"
            placeholder="Español"
            value={wordEs}
            onChange={(e) => setWordEs(e.target.value)}
            className="form-input"
          />
          <input
            type="text"
            placeholder="Inglés"
            value={wordEn}
            onChange={(e) => setWordEn(e.target.value)}
            className="form-input"
          />
        </div>
        <button
          type="submit"
          disabled={loading || !wordEs.trim() || !wordEn.trim()}
          className="btn btn-primary"
        >
          {loading ? "Guardando..." : "Guardar Palabra"}
        </button>
      </form>
    </div>
  );
}