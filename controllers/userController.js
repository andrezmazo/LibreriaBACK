const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// Controlador para crear un nuevo usuario
exports.create = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "El nombre de usuario ya está en uso" });
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el usuario
    const user = await User.create({
      username,
      password: hashedPassword,
      role,
    });

    res.status(201).json(user);
  } catch (error) {
    console.error("Error al crear usuario:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Controlador para iniciar sesión
exports.login = async (req, res) => {
  const {username, password} = req.body;

  try {
    // Buscar al usuario por su nombre de usuario
    const user = await User.findOne({where: {username}});

    // Verificar si el usuario existe y si la contraseña es correcta
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res
        .status(401)
        .json({message: "Nombre de usuario o contraseña incorrectos"});
    }

    // Generar token de autenticación
    const token = jwt.sign(
      {id: user.id, username: user.username},
      "clave_secreta",
      {expiresIn: "1h"}
    );

    res.json({token});
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.status(500).json({message: "Error interno del servidor"});
  }
};

exports.getAll = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

exports.getById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error al obtener usuario por ID:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Controlador para actualizar un usuario por su ID
exports.update = async (req, res) => {
  const { id } = req.params;
  const { username, password, role } = req.body;

  try {
    // Verificar si el usuario existe
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Actualizar el usuario
    user.username = username || user.username;
    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }
    user.role = role || user.role;
    await user.save();

    res.json(user);
  } catch (error) {
    console.error("Error al actualizar usuario por ID:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

// Controlador para eliminar un usuario por su ID
exports.delete = async (req, res) => {
  const { id } = req.params;

  try {
    // Verificar si el usuario existe
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Eliminar el usuario
    await user.destroy();

    res.json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar usuario por ID:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
