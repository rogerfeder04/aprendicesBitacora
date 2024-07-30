import Bitacora from "../models/bitacora.js";

const bitacoraHelper = {
    existeBitacoraID: async (id) => {
        
        try {
            const existe = await Bitacora.findById(id);
            if (!existe) {
                throw new Error(`La bitacora con ID ${id} no existe`);
            }
            return existe;
        } catch (error) {
            throw new Error(`Error al buscar la bitacora por ID: ${error.message}`);
        }
    },

    existeCodigo: async (codigo, method = "POST") => {
        try {
            const existe = await Bitacora.findOne({ codigo });
            if (existe) {
                throw new Error(`Ya existe ese bitacora en la base de datos: ${codigo}`);
            }
        } catch (error) {
            throw new Error(`Error al verificar codigo: ${error.message}`);
        }
    },

    verificarCodigo: async (codigo) => {
        try {
            const existe = await Bitacora.findOne({ codigo });
            if (!existe) {
                throw new Error(`El codigo ${codigo} no está registrado`);
            }
            return existe;
        } catch (error) {
            throw new Error(`Error al verificar codigo: ${error.message}`);
        }
    },
};

export { bitacoraHelper };