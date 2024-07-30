import Aprendices from '../models/aprendices.js';
import Ficha  from '../models/fichas.js';

const httpAprendiz = {
    
    // Crear un nuevo aprendiz
    crearAprendiz: async (req, res) => {
        const { cc, nombre, IdFicha, telefono, email} = req.body;
        try {
            const nuevoAprendis = new Aprendices({
                cc,
                nombre,
                IdFicha,
                telefono,
                email
            });

            const resultado = await nuevoAprendis.save();
            console.log('Aprendiz creado:', resultado);
            res.json(resultado);
        } catch (error) {
            console.error('Error al crear aprendiz:', error);
            res.status(500).json({ error: 'Error al crear el aprendiz' });
        }
    },

    // Editar un aprendiz por su ID
    EditarAprendiz: async (req, res) => {
        const { id } = req.params;
        const { cc, nombre, IdFicha, telefono, email } = req.body;
        try {
            const resultado = await Aprendices.findByIdAndUpdate(id, {
                cc,
                nombre,
                IdFicha,
                telefono, 
                email
            }, { new: true });

            if (!resultado) {
                throw new Error('Aprendiz no encontrado');
            }

            console.log('Aprendiz editado:', resultado);
            res.json(resultado);
        } catch (error) {
            console.error('Error al editar aprendiz:', error);
            res.status(500).json({ error: 'Error al editar el aprendiz' });
        }
    },

    // Listar todos los aprendices
    listarAprendiz: async (req, res) => {
        try {
            const aprendices = await Aprendices.find();
            console.log('Lista de aprendices:', aprendices);
            res.json(aprendices);
        } catch (error) {
            console.error('Error al listar aprendices:', error);
            res.status(500).json({ error: 'Error al listar los aprendices' });
        }
    },

    activarDesactivarUsuario: async (req, res) => {
        const { id } = req.params;

        try {
            const usuario = await Aprendices.findById(id);

            if (!usuario) {
                throw new Error('Usuario no encontrado');
            }

            usuario.estado = usuario.estado === 1 ? 0 : 1; // Alternar estado entre 1 y 0
            await usuario.save();

            const mensaje = usuario.estado === 1 ? 'Aprendiz activado' : 'Aprendiz desactivado';
            console.log(mensaje + ':', usuario);
            res.json({ msg: mensaje + ' correctamente' });
        } catch (error) {
            console.error('Error al activar/desactivar usuario:', error);
            res.status(500).json({ error: 'Error al activar/desactivar usuario' });
        }
    },
    // Eliminar un aprendiz por su ID
    eliminarAprendiz: async (req, res) => {
        const { id } = req.params;
        try {
            const aprendisEliminado = await Aprendices.findByIdAndDelete(id);

            if (!aprendisEliminado) {
                return res.status(404).json({ error: 'Aprendiz no encontrado' });
            }

            console.log('Aprendiz eliminado:', aprendisEliminado);
            res.json({ message: 'Aprendiz eliminado correctamente', aprendisEliminado });
        } catch (error) {
            console.error('Error al eliminar aprendiz:', error);
            res.status(500).json({ error: 'Error al eliminar el aprendiz' });
        }
    }

};

export default httpAprendiz;