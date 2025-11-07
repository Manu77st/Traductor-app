import { useState } from "react";
import { crearPalabra } from "../api/wordsApi";

interface Props {
  onWordAdded: () => void;
}

export default function WordForm({ onWordAdded }: Props) {
  const [wordEs, setWordEs] = useState("");
  const [wordEn, setWordEn] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!wordEs || !wordEn) {
      alert("Por favor llena ambos campos");
      return;
    }
    await crearPalabra(wordEs, wordEn);
    setWordEs("");
    setWordEn("");
    onWordAdded();
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Agregar Nueva Palabra</h2>
      <input
        type="text"
        placeholder="Español"
        value={wordEs}
        onChange={(e) => setWordEs(e.target.value)}
      />
      <input
        type="text"
        placeholder="Inglés"
        value={wordEn}
        onChange={(e) => setWordEn(e.target.value)}
      />
      <button type="submit">Guardar</button>
    </form>
  );
}
