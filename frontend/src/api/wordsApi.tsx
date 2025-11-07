const API_URL = 'http://localhost:4000/api/words';

export const getWords = async () => {
    const res = await fetch(API_URL);
    return res.json();
}

// Para crear una nueva palabra
export const crearPalabra = async (word_es: string, word_en: string)=>{
    const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({word_es, word_en}),
    });
    return res.json();
}

// Para actualizar una palabra existente
export const actualizarPalabra = async(id: number, word_es: string, word_en: string)=> {
    const res = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({word_es, word_en}),
    });
    return res.json();
}


export const eliminarPalabra = async(id: number) =>{
    const res = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });
    return res.json();
}

export const buscarPalabra = async (term: string) => {
    const res = await fetch(`${API_URL}/search?term=${encodeURIComponent(term)}`);
    return res.json();
}