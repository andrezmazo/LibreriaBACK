const { Op } = require("sequelize");
const Product = require("../models/productModel");

// Endpoint para crear un nuevo producto
exports.create = async (req, res) => {
  const {
    handle,
    title,
    description,
    sku,
    grams,
    stock,
    price,
    comparePrice,
    barcode,
  } = req.body;

  try {
    // Verificar si el producto ya existe
    const existingProduct = await Product.findOne({ where: { sku } });
    if (existingProduct) {
      return res
        .status(400)
        .json({ message: "El SKU del producto ya está en uso" });
    }

    // Crear el producto
    const product = await Product.create({
      handle,
      title,
      description,
      sku,
      grams,
      stock,
      price,
      comparePrice,
      barcode,
    });

    res.status(201).json(product);
  } catch (error) {
    console.error("Error al crear producto:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Endpoint para obtener todos los productos
exports.getAll = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

exports.list = async (req, res) => {
  try {
    const { rowsPerPage, page, title } = req.query;
    const offset = (page - 1) * rowsPerPage;
    let whereClause = {};
    if (title) {
      whereClause = { title: { [Op.like]: `%${title}%` } };
    }
    const products = await Product.findAndCountAll({
      where: whereClause,
      offset: offset,
      limit: parseInt(rowsPerPage),
      order: [['id', 'DESC']]
    });

    res.json({ content: products.rows, totalElements: products.count });
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Endpoint para obtener un producto por Id
exports.getById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.json(product);
  } catch (error) {
    console.error("Error al obtener producto por ID:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Endpoint para actualizar un producto por su ID
exports.update = async (req, res) => {
  const { id } = req.params;
  const {
    handle,
    title,
    description,
    sku,
    grams,
    stock,
    price,
    comparePrice,
    barcode,
  } = req.body;

  try {
    // Verificar si el producto existe
    let product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    const existingProduct = await Product.findOne({ where: { sku, id: { [Op.not]: id } } });
    if (existingProduct) {
      return res.status(400).json({ message: "El SKU del producto ya está en uso" });
    }

    // Actualizar el producto
    product = await product.update({
      handle,
      title,
      description,
      sku,
      grams,
      stock,
      price,
      comparePrice,
      barcode,
    });

    res.status(200).json(product);
  } catch (error) {
    console.error("Error al actualizar producto por ID:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Endpoint para eliminar un producto por su ID
exports.delete = async (req, res) => {
  const { id } = req.params;

  try {
    // Verificar si el producto existe
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    // Eliminar el producto
    await product.destroy();

    res.json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar producto por ID:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
