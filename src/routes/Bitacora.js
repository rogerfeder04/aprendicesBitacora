import express from 'express';
import { check } from 'express-validator';
import httpBitacora from '../controllers/bitacora.js';

import { validarJWT } from '../middleware/validarJWT.js';
import { validarCampos } from '../middleware/validar-campos.js';
import { aprendicesHelper } from '../helpers/aprendices.js';
import { bitacoraHelper } from '../helpers/bitacora.js';
import { fichasHelper } from '../helpers/fichas.js';
const router = express.Router();

router.post('/insertar',
    [
        validarJWT,
        check('IdAprendis', 'No es un ID válido').isMongoId(),
        check('IdAprendis').custom(aprendicesHelper.existeAprendizID),
        check('fecha', 'La fecha es obligatorio').not().isEmpty(),
        validarCampos
    ],
    httpBitacora.crearBitacora);

router.get('/bitacora/:inicio/:fin',
    [
        validarJWT
    ],
    httpBitacora.listarBitacoraPorFecha);
// intervalo de fechas y fecha especifica listar por id aprendiz....
router.get('/listarBitacora/:IdAprendis/:fechaInicio/:fechaFin',
    [
        validarJWT,
        check('IdAprendis', 'No es un ID válido').isMongoId(),
        check('IdAprendis').custom(aprendicesHelper.existeAprendizID),
        validarCampos
    ],
    httpBitacora.listarBitacoraPorAprendis);

// intervalo de fechas y fecha especifica listar id ficha....

router.get('/ListarbitacoraIdFicha/:_id',
    [
        validarJWT,
        check('_id', 'El id invalido').isMongoId(),
        check('_id').custom(fichasHelper.existeFichaID),
        validarCampos
    ],
    httpBitacora.obtenerBitacorasPorIdFicha);


router.put('/editarBitacora/:id',
    [
        validarJWT,
        check('id', 'El id invalido').isMongoId(),
        check('id').custom(bitacoraHelper.existeBitacoraID),
        validarCampos
    ],
    httpBitacora.editarBitacora);


router.delete('/eliminarBitacora/:id',
    [
        validarJWT,
        check('id', 'El id invalido').isMongoId(),
        check('id').custom(bitacoraHelper.existeBitacoraID),
        validarCampos
    ],
    httpBitacora.eliminarBitacora);


export default router;