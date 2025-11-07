const app = require('./app');
const sequelize = require('./config/database');
require('dotenv').config();

const PORT = process.env.PORT || 4000;

(async () =>{
    try{
        await sequelize.authenticate();
        console.log('Conexión a la bd exitosa my friend >:)');
        await sequelize.sync();
        app.listen(PORT, () =>
            console.log(`Servidor corriendo en el puerto ${PORT}`));
    }catch(error){
        console.log('Error al conectar a la bd my friend', error.message)
    }
})()