import mongoose from 'mongoose';
import Bitacora from '../models/bitacora.js';
import Aprendices from '../models/aprendices.js';
import ficha from '../models/fichas.js';

const httpBitacora = {
    // Listar todas las entradas de bitácora

    crearBitacora : async (req, res) => {
        try {
            const { IdAprendis, fecha } = req.body;
    
            const nuevaBitacora = new Bitacora({
                IdAprendis,
                fecha: new Date(fecha) // Convertir la fecha a un objeto de tipo Date
            });
    
            await nuevaBitacora.save();
            res.status(201).json(nuevaBitacora);
        } catch (error) {
            console.error('Error al insertar la bitácora:', error);
            res.status(500).json({ error: 'Error al insertar la bitácora' });
        }
    },
    
    // Listar todas las entradas de bitácora en un rango de fechas determinado
    listarBitacoraPorFecha : async (req, res) => {
        try {
            const { inicio, fin } = req.params;
            const inicioDate = new Date(inicio);
            const finDate = new Date(fin);
    
            // Verificar la validez de las fechas
            if (isNaN(inicioDate.getTime()) || isNaN(finDate.getTime())) {
                return res.status(400).json({ error: 'Fechas inválidas' });
            }
    
            const bitacoras = await Bitacora.find({ fecha: { $gte: inicioDate, $lte: finDate } });
            console.log('Lista de entradas de bitácora:', bitacoras);
            res.json(bitacoras);
        } catch (error) {
            console.error('Error al listar las entradas de bitácora:', error);
            res.status(500).json({ error: 'Error al listar las entradas de bitácora' });
        }
    },
    // Listar entradas de bitácora por ID de Aprendis en un rango de fechas determinado
    listarBitacoraPorAprendis: async (req, res) => {
        const { IdAprendis } = req.params;
        const { fechaInicio, fechaFin } = req.params; 
        try {
            const fechaInicioDate = new Date(fechaInicio);
            const fechaFinDate = new Date(fechaFin);
    
            // Verificar la validez de las fechas
            if (isNaN(fechaInicioDate.getTime()) || isNaN(fechaFinDate.getTime())) {
                return res.status(400).json({ error: 'Fechas inválidas' });
            }
    
            const bitacoras = await Bitacora.find({ 
                IdAprendis,
                fecha: { $gte: fechaInicioDate, $lte: fechaFinDate }
            }).sort({ fecha: -1 });
    
            console.log(`Lista de entradas de bitácora para el aprendiz ${IdAprendis} entre ${fechaInicio} y ${fechaFin}:`, bitacoras);
            res.json(bitacoras);
        } catch (error) {
            console.error(`Error al listar las entradas de bitácora para el aprendiz ${IdAprendis} entre ${fechaInicio} y ${fechaFin}:`, error);
            res.status(500).json({ error: `Error al listar las entradas de bitácora para el aprendiz ${IdAprendis} entre ${fechaInicio} y ${fechaFin}` });
        }
    },

    
    // Listar entradas de bitácora por IDFicha (en un rango de fechas determinado)
    obtenerBitacorasPorIdFicha : async (req,res) => {
        try {
            // Verificamos que el idFicha proporcionado es válido
            
            const {_id}=req.params
            const idFicha=_id
            if (!mongoose.Types.ObjectId.isValid(idFicha)) {
                throw new Error('ID de ficha no válido');
            }
    
            const bitacoras = await Bitacora.aggregate([
                {
                    $lookup: {
                        from: 'aprendices',
                        localField: 'IdAprendis',
                        foreignField: '_id',
                        as: 'aprendiz'
                    }
                },
                {
                    $unwind: '$aprendiz'
                },
                {
                    $match: {
                        'aprendiz.IdFicha':new mongoose.Types.ObjectId(idFicha)
                    }
                },
                {
                    $lookup: {
                        from: 'fichas',
                        localField: 'aprendiz.IdFicha',
                        foreignField: '_id',
                        as: 'ficha'
                    }
                },
                {
                    $unwind: '$ficha'
                },
                {
                    $project: {
                        fecha: 1,
                        'aprendiz.nombre': 1,
                        'aprendiz.cc': 1,
                        'ficha.nombre': 1
                    }
                }
            ]);
    
            res.json({bitacoras})
        } catch (error) {
            console.error('Error al obtener las bitácoras:', error);
            res.json({error});
        }
    },
    editarBitacora : async (req, res) => {
        const { id } = req.params;
        const { IdAprendis, fecha } = req.body;
    
        try {
            const bitacora = await Bitacora.findById(id);
    
            if (!bitacora) {
                return res.status(404).json({ error: 'Bitácora no encontrada' });
            }
    
            bitacora.IdAprendis = IdAprendis || bitacora.IdAprendis;
            bitacora.fecha = fecha ? new Date(fecha) : bitacora.fecha;
    
            const bitacoraActualizada = await bitacora.save();
            res.json(bitacoraActualizada);
        } catch (error) {
            console.error('Error al actualizar la bitácora:', error);
            res.status(500).json({ error: 'Error al actualizar la bitácora' });
        }
    },
    eliminarBitacora : async (req, res) => {
        const { id } = req.params;
        try {
          const bitacoraEliminar = await Bitacora.findByIdAndDelete(id);
    
          if (!bitacoraEliminar) {
            return res.status(404).json({ error: "bitacora no encontrada" });
          }
    
          console.log("bitacora eliminada:", bitacoraEliminar);
          res.json({ message: "bitacora eliminada correctamente", bitacoraEliminar });
        } catch (error) {
          console.error("Error al eliminar bitacora:", error);
          res.status(500).json({ error: "Error al eliminar bitacora" });
        }
      }
};

export default httpBitacora;