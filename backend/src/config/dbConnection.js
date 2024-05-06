import mongoose from 'mongoose';
import {config}  from 'dotenv';
config();


export const dbConnection = async () => {
    try{
        const {connection} = await mongoose.connect(process.env.DB_URL);
        if(connection){
            console.log(`DB Connected Successfully: ${connection.host}`);
        }
    }catch(error){
        console.error('Connection Failed -> ',error);
        process.exit(1);
    }
}