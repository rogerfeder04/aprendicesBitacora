import Aprendices from '../models/aprendices.js'

const aprendicesHelper = {

    existeFichaID: async (id) => {
        
        try {
            const existe = await Fichas.findById(id);
            if (!existe) {
                throw new Error(`La ficha con ID ${id} no existe`);
            }
            return existe;
        } catch (error) {
            throw new Error(`Error al buscar la ficha por ID: ${error.message}`);
        }
    },

    existeCc: async (cc, req) => {
        if (cc) {
            const existe = await Aprendices.findOne({ cc })
            if (existe) {
                if (req.req.method === "PUT") {
                    if (existe.cc !== req.req.usuariobd.cc)
                        throw new Error(`Ya existe ese cc en la base de datos!!! ${cc}`)

                } else {
                    throw new Error(`Ya existe ese cc en la base de datos!!! ${cc}`)
                }
            }
        }
    },

    existeEmail: async (email, method = "POST") => {
        try {
            const existe = await Aprendices.findOne({ email });
            if (existe) {
                throw new Error(`Ya existe ese email en la base de datos: ${email}`);
            }
        } catch (error) {
            throw new Error(`Error al verificar email: ${error.message}`);
        }
    },

    verificarEmail: async (email) => {
        try {
            const existe = await Aprendices.findOne({ email });
            if (!existe) {
                throw new Error(`El email ${email} no está registrado`);
            }
            return existe;
        } catch (error) {
            throw new Error(`Error al verificar email: ${error.message}`);
        }
    },
    existeAprendizID: async (id) => {
        
        try {
            const existe = await Aprendices.findById(id);
            if (!existe) {
                throw new Error(`La ficha con ID ${id} no existe`);
            }
            return existe;
        } catch (error) {
            throw new Error(`Error al buscar la ficha por ID: ${error.message}`);
        }
    },
}
export  {aprendicesHelper};