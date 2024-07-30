import mongoose from 'mongoose';

const bitacoraSchema = new mongoose.Schema({
    IdAprendis: { type: mongoose.Schema.Types.ObjectId, ref: 'Aprendices' },
    fecha: { type: Date, required: true },
}, { timestamps: true });

export default mongoose.model("Bitacora", bitacoraSchema);


// litar todo
// listar por Aprendis
// listar por ficha


