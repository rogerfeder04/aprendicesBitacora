import jwt from 'jsonwebtoken';
import Usuario from "../models/usuarios.js";

const generarJWT = (uid) => {
    return new Promise((resolve, reject) => {
        const payload = { uid };
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: "100y" // 100 years
        }, (err, token) => {
            if (err) {
                reject("No se pudo generar el token");
            } else {
                resolve(token);
            }
        });
    });
};

const validarJWT = async (req, res, next) => {
    const token = req.header("x-token");
    if (!token) {
        return res.status(401).json({
            msg: "Error en la petición"
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        if (!uid) {
            return res.status(401).json({
                msg: "Error en la petición"
            });
        }

        const usuario = await Usuario.findById(uid);
        if (!usuario) {
            return res.status(401).json({
                msg: "Error en la petición! Usuario no existe en la base de datos"
            });
        }

        req.usuario = usuario;
        next();

    } catch (error) {
        res.status(401).json({
            msg: "Token no válido"
        });
    }
};

export { generarJWT, validarJWT };
