//(Se recomienda escuchar música cuando se esté haciendo este taller porque inspira :) )

const express = require('express');
const router = express.Router();
const Word = require('../models/Word');
const { Sequelize } = require('sequelize');


//Para crear una nueva palabra
router.post('/', async (req, res) => {
  try {
    const { word_es, word_en } = req.body;

    // Validar campos vacíos
    if (!word_es || !word_en) {
      return res.status(400).json({ mensaje: 'Ambos campos son obligatorios' });
    }

    // Validar duplicados (en español o inglés)
    const existe = await Word.findOne({
      where: {
        [Sequelize.Op.or]: [
          { word_es: word_es.trim().toLowerCase() },
          { word_en: word_en.trim().toLowerCase() }
        ]
      }
    });

    if (existe) {
      return res.status(400).json({ mensaje: 'Esa palabra ya existe en la base de datos' });
    }

    // Crear nueva palabra
    const nuevaPalabra = await Word.create({
      word_es: word_es.trim().toLowerCase(),
      word_en: word_en.trim().toLowerCase()
    });

    res.json(nuevaPalabra);
  } catch (err) {
    res.status(500).json({ mensaje: 'Hubo un pequeño error al crear la palabra >:(', err });
  }
});

//Ruta para obtener todas las palabras :)

router.get('/', async(req, res)=>{
    try{
        const palabras = await Word.findAll();
        res.json(palabras);
    }catch(err){
        res.status(500).json({mensaje: 'Hubo un pequeño error al obtener las palabras jijijaarrr', err});
    }
})

//Para buscar una palabra por texto
router.get('/search', async (req, res) => {
  try {
    const { term } = req.query;
    if (!term) {
      return res.status(400).json({ mensaje: 'Tenés que enviar un término para buscar' });
    }

    // Buscar coincidencias en español o inglés
    const palabras = await Word.findAll({
      where: {
        [Sequelize.Op.or]: [
          { word_es: { [Sequelize.Op.like]: `%${term}%` } },
          { word_en: { [Sequelize.Op.like]: `%${term}%` } }
        ]
      }
    });

    if (palabras.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontró ninguna palabra con ese término :/' });
    }

    res.json(palabras);
  } catch (err) {
    res.status(500).json({ mensaje: 'Hubo un pequeño error al buscar palabras', err });
  }
});


//Ruta para obtener palabra por su id
router.get('/:id', async(req, res)=>{
    try{
        const {id} = req.params;
        const palabra = await Word.findByPk(id);
        if(!palabra){ 
            return res.status(404).json({mensaje: 'La palabra no fue encontrada mi amigo'})
        }
        res.json(palabra)
    }catch(err){
        res.status(500).json({mensaje: 'Hubo un pequeño error al obtener la palabra', err})
    }
})

// Ruta para actualizar una palabra
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { word_es, word_en } = req.body;

    if (!word_es || !word_en) {
      return res.status(400).json({ mensaje: 'Ambos campos son obligatorios' });
    }

    const palabra = await Word.findByPk(id);
    if (!palabra) {
      return res.status(404).json({ mensaje: 'La palabra no fue encontrada o probablemente no exista' });
    }

    // Validar si ya existe otra palabra con esos valores
    const duplicada = await Word.findOne({
      where: {
        [Sequelize.Op.or]: [
          { word_es: word_es.trim().toLowerCase() },
          { word_en: word_en.trim().toLowerCase() }
        ],
        id: { [Sequelize.Op.ne]: id } // excluye la palabra actual
      }
    });

    if (duplicada) {
      return res.status(400).json({ mensaje: 'Ya existe una palabra con esos valores' });
    }

    await palabra.update({
      word_es: word_es.trim().toLowerCase(),
      word_en: word_en.trim().toLowerCase()
    });

    res.json(palabra);
  } catch (err) {
    res.status(500).json({ mensaje: 'Hubo un pequeño inconveniente al actualizar la palabra', err });
  }
});

//Ruta para eliminar una palabra

router.delete('/:id', async(req, res)=>{
    try{
        const {id} = req.params;
        const eliminarPalabra = await Word.destroy({
            where: {id}
        });
        if(!eliminarPalabra) return res.status(404).json({mensaje: 'La palabra no fue encontrada'})
        res.json({mensaje: 'La palabra fue eliminada exitosamente >:)'})

        //const palabra = await Word.findByPk(id);
        //if(!palabra) return res.status(400).json({mensaje: 'La palabra no fue encontrada o problablemente no exista'})
    }catch(err){}
});


module.exports = router;
