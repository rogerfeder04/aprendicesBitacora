import express from 'express';
import { check } from 'express-validator';
import httpUsuario from '../controllers/usuarios.js';
import { validarJWT } from '../middleware/validarJWT.js';
import { validarCampos } from '../middleware/validar-campos.js';
import { usuarioHelper } from '../helpers/usuarios.js';

const router = express.Router();

// Rutas para operaciones de Usuario
router.post('/insertarUsuario', [
    check('email', 'El email es obligatorio').not().isEmpty(),
    check('email', 'El email no es válido').isEmail(),
    check('email').custom(usuarioHelper.existeEmail),
    check('password', 'La contraseña debe tener al menos 8 caracteres').isLength({ min: 8 }),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], httpUsuario.crearUsuario);


router.post('/login', [
    check('email', 'El email es obligatorio').not().isEmpty(),
    check('email', 'El email no es válido').isEmail(),
    check('password', 'La contraseña debe tener al menos 8 caracteres').isLength({ min: 8 }),
    validarCampos
], httpUsuario.login);

router.get('/listar', [
    validarJWT
], httpUsuario.listarUsuarios);

router.put('/editar/:id', [
    validarJWT,
    check('id', 'ID inválido').isMongoId(),
    check('email', 'El email es obligatorio').not().isEmpty(),
    check('email', 'El email no es válido').isEmail(),
    validarCampos
], httpUsuario.editarUsuario);

router.put('/cambiarContrasena/:id', [
    validarJWT,
    check('id', 'ID inválido').isMongoId(),
    check('newPassword', 'La contraseña debe tener al menos 8 caracteres').isLength({ min: 8 }),
    validarCampos
], httpUsuario.cambiarContraseña);

router.put('/activarDesactivar/:id', [
    validarJWT,
    check('id', 'ID inválido').isMongoId(),
    validarCampos
], httpUsuario.activarDesactivarUsuario);

router.delete('/eliminar/:id', [
    validarJWT,
    check('id', 'ID inválido').isMongoId(),
    validarCampos
], httpUsuario.eliminarUsuario);

export default router;