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

  useEffect(() => {
    cargarPalabras();
  }, []);

  async function cargarPalabras() {
    const data = await getWords();
    setWords(data);
  }

  async function borrarPalabra(id: number) {
    await eliminarPalabra(id);
    cargarPalabras();
  }

  async function guardarCambios(id: number) {
    if (!wordEs || !wordEn) {
      alert("Por favor llena ambos campos");
      return;
    }
    await actualizarPalabra(id, wordEs, wordEn);
    setEditId(null);
    setWordEs("");
    setWordEn("");
    cargarPalabras();
  }

  return (
    <div>
      <h2>Lista de Palabras</h2>
      <ul>
        {words.map((word) => (
          <li key={word.id}>
            {editId === word.id ? (
              <>
                <input
                  value={wordEs}
                  onChange={(e) => setWordEs(e.target.value)}
                  placeholder="Español"
                />
                <input
                  value={wordEn}
                  onChange={(e) => setWordEn(e.target.value)}
                  placeholder="Inglés"
                />
                <button onClick={() => guardarCambios(word.id)}>Guardar</button>
                <button onClick={() => setEditId(null)}>❌ Cancelar</button>
              </>
            ) : (
              <>
                {word.word_es} → {word.word_en}{" "}
                <button onClick={() => borrarPalabra(word.id)}>Eliminar</button>
                <button
                  onClick={() => {
                    setEditId(word.id);
                    setWordEs(word.word_es);
                    setWordEn(word.word_en);
                  }}
                >
                  Editar
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
