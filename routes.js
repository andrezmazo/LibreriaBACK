const express = require("express");
const router = express.Router();
const userController = require("./controllers/userController");
const productController = require("./controllers/productController");

// Ruta de inicio de sesión
router.post("/login", userController.login);

// Rutas de usuario
router.post("/user", userController.create);
router.get("/user", userController.getAll);
router.get("/user/:id", userController.getById);
router.put("/user/:id", userController.update);
router.delete("/user/:id", userController.delete);

// Rutas de products
router.post("/product", productController.create);
router.get("/product", productController.getAll);
router.get("/product/list", productController.list);
router.get("/product/:id", productController.getById);
router.put("/product/:id", productController.update);
router.delete("/product/:id", productController.delete);

module.exports = router;
