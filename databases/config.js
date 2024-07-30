import mongoose from "mongoose";

const dbconnect  = async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_CNX)
        console.log("conexion exitosa");
        
    } catch (error) {
        throw new Error("Error connecting")
        
    }
}

export { dbconnect }; 