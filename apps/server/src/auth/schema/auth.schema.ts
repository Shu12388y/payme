import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    phonenumber:{
        type:String
    }
});


export const Auth = mongoose.models.Auth || mongoose.model('Auth',UserSchema);
