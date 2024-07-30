import mongoose from 'mongoose';
 
const aprendisSchema = new mongoose.Schema({
    cc: {type:Number, required: true},
    nombre: { type: String, required: true, },
    IdFicha: { type: mongoose.Schema.Types.ObjectId, ref: 'Ficha' },
    estado: { type: Number, required: true, default: 1 },
    telefono: { type: String, required: true },
    email: { type: String, required: true }
}, { timestamps: true })


export default mongoose.model("Aprendices",  aprendisSchema);

// crear 
// editar
// lisar
// editar
// borrar, añadir__telefono,email
