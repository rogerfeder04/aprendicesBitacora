import mongoose from 'mongoose';

const fichasSchema = new mongoose.Schema({
    codigo: { type: String, required: true, unique: true },
    nombre: { type: String, required: true },
    estado: { type: Number, required: true, default: 1 }
}, { timestamps: true });

export default mongoose.model("Ficha", fichasSchema);

// crear 
// editar   
// listar
// editar
// borrar
// activar / desativar