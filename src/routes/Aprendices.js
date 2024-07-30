import express from 'express';
import { check } from 'express-validator';
import httpAprendiz from '../controllers/aprendices.js';
const router = express.Router();

import { validarJWT } from '../middleware/validarJWT.js';
import { validarCampos } from '../middleware/validar-campos.js';
import { aprendicesHelper } from '../helpers/aprendices.js';
import { fichasHelper } from '../helpers/fichas.js';


router.post('/insertaraprendiz',
    [
        validarJWT,
        check('cc', 'la cc  es obligatorio').not().isEmpty(),
        check('cc').custom(aprendicesHelper.existeCc),
        check('nombre', 'El nombre no es válido').not().isEmpty(),
        check('IdFicha').custom(fichasHelper.existeFichaID),
        check('telefono', 'el telefono debe tener al menos 10 caracteres').isLength({ min: 10 }),
        check('email', 'El email no es válido').isEmail(),
        check('email').custom(aprendicesHelper.existeEmail),
        validarCampos
    ],
    httpAprendiz.crearAprendiz);


router.get('/Listar', [
    validarJWT
],  httpAprendiz.listarAprendiz)


router.get('/Listar2/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(aprendicesHelper.existeAprendizID),
],  httpAprendiz.listarAprendiz);

router.put("/editarAprendiz/:id", [
    validarJWT,
    check('id', 'ID inválido').isMongoId(),
    check('cc', 'la cc  es obligatorio').not().isEmpty(),
    // check('cc').custom(aprendicesHelper.existeCc),
    check('nombre', 'El nombre no es válido').not().isEmpty(),
    check('IdFicha').custom(fichasHelper.existeFichaID),
    check('telefono', 'el telefono debe tener al menos 10 caracteres').isLength({ min: 10 }),
    check('email', 'El email no es válido').isEmail(),
    // check('email').custom(aprendicesHelper.existeEmail),
    validarCampos
], httpAprendiz.EditarAprendiz);


router.put('/activarDesactivar/:id', [
    validarJWT,
    check('id', 'ID inválido').isMongoId(),
    validarCampos
], httpAprendiz.activarDesactivarUsuario);


router.delete('/Eliminar/:id',[
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(aprendicesHelper.existeAprendizID),
], httpAprendiz.eliminarAprendiz)

// router.put('/Editar/:id', httpAprendiz.editarAprendiz)

export default router;