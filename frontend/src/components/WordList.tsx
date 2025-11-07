import { useEffect, useState } from "react";
import { actualizarPalabra, eliminarPalabra, getWords } from "../api/wordsApi";

interface Word {
  id: number;
  word_es: string;
  word_en: string;
}

export default function WordList() {
  const [words, setWords] = useState<Word[]>([]);
  const [editId, setEditId] = useState<number | null>(null);
  const [wordEs, setWordEs] = useState("");
  const [wordEn, setWordEn] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarPalabras();
  }, []);

  async function cargarPalabras() {
    setLoading(true);
    try {
      const data = await getWords();
      setWords(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function borrarPalabra(id: number) {
    if (window.confirm("¿Estás seguro de eliminar esta palabra?")) {
      await eliminarPalabra(id);
      cargarPalabras();
    }
  }

  async function guardarCambios(id: number) {
    if (!wordEs.trim() || !wordEn.trim()) {
      alert("Por favor llena ambos campos");
      return;
    }
    await actualizarPalabra(id, wordEs, wordEn);
    setEditId(null);
    setWordEs("");
    setWordEn("");
    cargarPalabras();
  }

  function iniciarEdicion(word: Word) {
    setEditId(word.id);
    setWordEs(word.word_es);
    setWordEn(word.word_en);
  }

  function cancelarEdicion() {
    setEditId(null);
    setWordEs("");
    setWordEn("");
  }

  if (loading) {
    return (
      <div className="card">
        <p className="loading-state">Cargando palabras...</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h2 className="section-title">
        Vocabulario ({words.length})
      </h2>

      {words.length === 0 ? (
        <p className="empty-state">
          No hay palabras guardadas aún. ¡Agrega tu primera palabra arriba!
        </p>
      ) : (
        <div className="word-list-container">
          {words.map((word) => (
            <div key={word.id} className="word-item">
              {editId === word.id ? (
                <>
                  <div className="edit-grid">
                    <input
                      value={wordEs}
                      onChange={(e) => setWordEs(e.target.value)}
                      placeholder="Español"
                      className="edit-input"
                    />
                    <input
                      value={wordEn}
                      onChange={(e) => setWordEn(e.target.value)}
                      placeholder="Inglés"
                      className="edit-input"
                    />
                  </div>
                  <div className="action-buttons">
                    <button
                      onClick={() => guardarCambios(word.id)}
                      title="Guardar"
                      className="btn-icon btn-icon-save"
                    >
                      Guardar
                    </button>
                    <button
                      onClick={cancelarEdicion}
                      title="Cancelar"
                      className="btn-icon btn-icon-cancel"
                    >
                      Cancelar
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="word-content">
                    <span className="word-text">
                      <span className="word-text-bold">{word.word_es}</span>
                      <span className="word-arrow">→</span>
                      <span className="word-text-bold">{word.word_en}</span>
                    </span>
                  </div>
                  <div className="action-buttons">
                    <button
                      onClick={() => iniciarEdicion(word)}
                      title="Editar"
                      className="btn-icon btn-icon-edit"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => borrarPalabra(word.id)}
                      title="Eliminar"
                      className="btn-icon btn-icon-delete"
                    >
                      Eliminar
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}