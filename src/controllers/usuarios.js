import Usuario from '../models/usuarios.js';
import bcryptjs from "bcrypt";
import { generarJWT } from "../middleware/validarJWT.js";

const httpUsuario = {
    
    // Crear un nuevo usuario
    crearUsuario: async (req, res) => {
        const { email, password, nombre } = req.body;

        try {
            // Verificar si el usuario ya existe
            const usuarioExistente = await Usuario.findOne({ email });
            if (usuarioExistente) {
                return res.status(400).json({ error: 'El usuario ya existe' });
            }

            // Encriptar la contraseña
            const salt = bcryptjs.genSaltSync();
            const passwordEncriptada = bcryptjs.hashSync(password, salt);

            const nuevoUsuario = new Usuario({
                email,
                password: passwordEncriptada,
                nombre
            });

            const resultado = await nuevoUsuario.save();
            console.log('Usuario creado:', resultado);

            res.status(201).json(resultado);
        } catch (error) {
            console.error('Error al crear usuario:', error);
            res.status(500).json({ error: 'Error al crear usuario' });
        }
    },


    // loguin
    
    login: async (req, res) => {
        const { email, password } = req.body;
        try {
            // Verificar si el usuario existe y si la contraseña es correcta
            const usuario = await Usuario.findOne({ email });

            if (!usuario || usuario.estado === 0 || !bcryptjs.compareSync(password, usuario.password)) {
                return res.status(401).json({
                    msg: "Usuario / Password no son correctos",
                });
            }

            // Generar token JWT
            const token = await generarJWT(usuario._id);

            res.json({
                usuario,
                token,
            });
        } catch (error) {
            console.error('Error en login:', error);
            res.status(500).json({ msg: "Hable con el WebMaster" });
        }
    },



    // Listar todos los usuarios
    listarUsuarios: async (req, res) => {
        try {
            const usuarios = await Usuario.find();
            console.log('Lista de usuarios:', usuarios);
            res.json(usuarios);
        } catch (error) {
            console.error('Error al listar usuarios:', error);
            res.status(500).json({ error: 'Error al listar usuarios' });
        }
    },

    // Editar un usuario por su ID
    editarUsuario: async (req, res) => {
        const { id } = req.params;
        const { email, nombre } = req.body;

        try {
            const usuarioActualizado = await Usuario.findByIdAndUpdate(id, {
                email,
                nombre
            }, { new: true });

            if (!usuarioActualizado) {
                throw new Error('Usuario no encontrado');
            }

            console.log('Usuario editado:', usuarioActualizado);
            res.json(usuarioActualizado);
        } catch (error) {
            console.error('Error al editar usuario:', error);
            res.status(500).json({ error: 'Error al editar usuario' });
        }
    },

    // Cambiar la contraseña de un usuario por su ID
    cambiarContraseña:async (req, res) => {
        const { id } = req.params;
        const { newPassword } = req.body;
        try {
            const usuario = await Usuario.findById(id);
            if (usuario) {
                const salt = bcryptjs.genSaltSync(10); // Genera una salt para hashear la contraseña
                const hashedPassword = bcryptjs.hashSync(newPassword, salt); // Hashea la nueva contraseña
                usuario.password = hashedPassword; // Guarda la contraseña hasheada en el usuario
                await usuario.save();
                res.json({ msg: "Contraseña actualizada correctamente" });
            } else {
                res.status(404).json({ msg: "Usuario no encontrado" });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    // Eliminar un usuario por su ID
    eliminarUsuario: async (req, res) => {
        const { id } = req.params;

        try {
            const resultado = await Usuario.findByIdAndDelete(id);

            if (!resultado) {
                throw new Error('Usuario no encontrado');
            }

            console.log('Usuario eliminado:', resultado);
            res.json({ msg: 'Usuario eliminado correctamente' });
        } catch (error) {
            console.error('Error al eliminar usuario:', error);
            res.status(500).json({ error: 'Error al eliminar usuario' });
        }
    },

    // Activar o desactivar un usuario por su ID
    activarDesactivarUsuario: async (req, res) => {
        const { id } = req.params;

        try {
            const usuario = await Usuario.findById(id);

            if (!usuario) {
                throw new Error('Usuario no encontrado');
            }

            usuario.estado = usuario.estado === 1 ? 0 : 1; // Alternar estado entre 1 y 0
            await usuario.save();

            const mensaje = usuario.estado === 1 ? 'Usuario activado' : 'Usuario desactivado';
            console.log(mensaje + ':', usuario);
            res.json({ msg: mensaje + ' correctamente' });
        } catch (error) {
            console.error('Error al activar/desactivar usuario:', error);
            res.status(500).json({ error: 'Error al activar/desactivar usuario' });
        }
    }
};

export default httpUsuario;