# Traductor-app

Una aplicación web para traducir palabras entre español e inglés, con capacidad de almacenamiento y gestión de traducciones.

## Descripción

Traductor-app es una aplicación web full-stack que permite a los usuarios:
- Agregar nuevas palabras con sus traducciones
- Buscar palabras existentes en la base de datos
- Ver una lista completa de las palabras almacenadas
- Editar y eliminar traducciones existentes

## Tecnologías Utilizadas

### Frontend
- React
- TypeScript
- Vite
- CSS para estilos

### Backend
- Node.js
- Express
- MySQL
- Sequelize ORM

## Requisitos Previos

- Node.js (versión 14 o superior)
- MySQL
- npm o yarn

## Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/Manu77st/Traductor-app.git
cd Traductor-app
```

2. Configurar el Backend:
```bash
cd backend
npm install
```

3. Configurar el Frontend:
```bash
cd frontend
npm install
```

4. Crear archivo .env en la carpeta backend con las siguientes variables:
```
PORT=4000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_NAME=traductor_db
```

5. Crear la base de datos en MySQL:
```sql
CREATE DATABASE traductor_db;
```

## Ejecución

1. Iniciar el Backend:
```bash
cd backend
npm run dev
```

2. Iniciar el Frontend:
```bash
cd frontend
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## Estructura del Proyecto

```
traductor-app/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── app.js
│   │   └── index.js
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── api/
    │   ├── App.tsx
    │   └── main.tsx
    └── package.json
```

## Características

- Interfaz de usuario intuitiva y responsive
- Almacenamiento persistente de traducciones en MySQL
- API RESTful para la gestión de traducciones
- Validación de datos en frontend y backend
- Búsqueda en tiempo real de traducciones

## Autor

- Emanuel Barranco
- GitHub: [@Manu77st](https://github.com/Manu77st)

