import React, { useState } from "react";
import { buscarPalabra } from "../api/wordsApi";

export default function WordSearch(){
    const [term, setTerm] = useState("");
    const [results, setResults] = useState<any[]>([]);

    async function handleSearch(e: React.FormEvent){
        e.preventDefault();
        if (!term) return alert ("Escribe algo para buscar :)");

        try{
            const data = await buscarPalabra(term);
            setResults(data);
        }catch(err){
            setResults([]);
            alert("No se encontraron resultados :( pipipi")
        }
    }

    return(
        <div>
            <h2>Buscar Palabra</h2>
            <form onSubmit={handleSearch}>
                <input
                type="text"
                placeholder="Buscar palabra....."
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                />
                <button type="submit">Buscar</button>
            </form>

            <ul>
                {results.map((word) => (
                <li key={word.id}>
                    {word.word_es} → {word.word_en}
                </li>
                ))}
            </ul>
        </div>
    );
}