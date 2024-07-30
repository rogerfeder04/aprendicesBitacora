import express from 'express';
import { check } from 'express-validator';
import httpFichas from '../controllers/fichas.js';
import { validarJWT } from '../middleware/validarJWT.js';
import { validarCampos } from '../middleware/validar-campos.js';
import { fichasHelper } from '../helpers/fichas.js';

const router = express.Router();

router.post('/insertar', [
    // validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('codigo', 'El código es obligatorio').not().isEmpty(),
    check('codigo', 'El código debe ser un número de 7 dígitos').isNumeric().isLength({ min: 7, max: 7 }),
    check('codigo').custom(fichasHelper.existeCodigo),
    validarCampos
], httpFichas.crearFicha);


router.get('/listar', [
    // validarJWT
], httpFichas.listarFichas);


router.get('/listar2/:id', [
    // validarJWT,
    check('id', 'El id invalido').isMongoId(),
    check('id').custom(fichasHelper.existeFichaID),
    validarCampos
], httpFichas.listarFichaPorId);

router.delete('/eliminar/:id', [
    // validarJWT,
    check('id', 'ID inválido').isMongoId(),
    check('id').custom(fichasHelper.existeFichaID),
    validarCampos
], httpFichas.eliminarFicha);

router.put('/activarDesactivar/:id', [
    // validarJWT,
    check('id', 'ID inválido').isMongoId(),
    check('id').custom(fichasHelper.existeFichaID),
    validarCampos
], httpFichas.activarDesactivarFicha);

router.put('/editar/:id', [
    // validarJWT,
    check('id', 'ID inválido').isMongoId(),
    check('id').custom(fichasHelper.existeFichaID),
    check('codigo', 'El código es obligatorio').not().isEmpty(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('codigo', 'El código debe ser un número de 7 dígitos').isNumeric().isLength({ min: 7, max: 7 }),
    validarCampos
], httpFichas.editarFicha);

export default router;
