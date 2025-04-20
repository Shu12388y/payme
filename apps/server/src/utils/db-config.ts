import mongoose from "mongoose";


export const DB = async()=>{
    try {
        await mongoose.connect('mongodb://localhost:27017/paytmdb');
    } catch (error) {
        console.log(error)
        return
    }
}