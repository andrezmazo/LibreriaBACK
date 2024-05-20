const User = require("../models/userModel");
const bcrypt = require("bcrypt");

class UserService {
  static async createUser(username, password, role) {
    try {
      // Verificar si el usuario ya existe
      const existingUser = await User.findOne({ where: { username } });
      if (existingUser) {
        throw new Error("El nombre de usuario ya está en uso");
      }

      // Hash de la contraseña
      const hashedPassword = await bcrypt.hash(password, 10);

      // Crear el usuario
      const user = await User.create({
        username,
        password: hashedPassword,
        role,
      });
      return user;
    } catch (error) {
      throw error;
    }
  }

  static async getAllUsers() {
    try {
      const users = await User.findAll();
      return users;
    } catch (error) {
      throw error;
    }
  }

  static async getUserById(id) {
    try {
      const user = await User.findByPk(id);
      return user;
    } catch (error) {
      throw error;
    }
  }

  static async updateUser(id, userData) {
    try {
      const user = await User.findByPk(id);
      if (!user) {
        throw new Error("Usuario no encontrado");
      }

      // Actualizar el usuario
      Object.assign(user, userData);
      await user.save();

      return user;
    } catch (error) {
      throw error;
    }
  }

  static async deleteUser(id) {
    try {
      const user = await User.findByPk(id);
      if (!user) {
        throw new Error("Usuario no encontrado");
      }

      // Eliminar el usuario
      await user.destroy();

      return { message: "Usuario eliminado correctamente" };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserService;
