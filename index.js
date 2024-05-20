const express = require("express");
const sequelize = require("./models/sequelize");
const routes = require("./routes");
const cors = require("cors");

const app = express();

// Conexión a la base de datos
sequelize
  .authenticate()
  .then(() => {
    console.log("Conexión establecida correctamente con la base de datos.");
  })
  .catch((err) => {
    console.error("Error al conectar con la base de datos:", err);
  });

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use("/", routes);

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT} 🔥`);
});
