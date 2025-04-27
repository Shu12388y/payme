import { Response, Request } from "express";
import { AuthType } from "../types/auth.types";
import { AuthModel } from "../models/auth.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"



export class AuthController {
  static async signup(req: Request, res: Response) {
    try {
      const data = req.body;
      if (!data) {
        res.status(404).json({ message: "Empty Request Body" });
      }

      // parse the data in zod checker
      const checkAuthTypes = AuthType.safeParse(data);
      if (!checkAuthTypes.success) {
        res.status(400).json({ message: checkAuthTypes.error.errors });
      }

      const hashedPassword = await bcrypt.hash(data.password, 10);

      const createNewUser = await AuthModel.createUser({
        email: data.email,
        password: hashedPassword,
        firstname: data.firstname,
        lastname: data.lastname,
        phonenumber: data.phonenumber,
      });

      switch (createNewUser.code) {
        case 301:
          res
            .status(createNewUser.code)
            .json({ message: createNewUser.message });
          break;
        case 201:
          res
            .status(createNewUser.code)
            .json({ message: createNewUser.message });
          break;

        default:
          res
            .status(createNewUser.code)
            .json({ message: createNewUser.message });
          break;
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async signin(req:Request,res:Response){
    try {
      const data = await req.body;
      if(!data){
        res.status(404).json({message:"Empty request body"})
      }

      const comparePassword = bcrypt.compare

      const userSignInfo = await AuthModel.signInUser({
        email:data.email,
        password:data.password,
        comparePassword:comparePassword
      });


      switch (userSignInfo.code) {
        case 404: return res.status(userSignInfo.code).json({message:userSignInfo.message})
        case 403: return res.status(userSignInfo.code).json({message:userSignInfo.message})
      }

      
      const createUserToken  =  await jwt.sign({id:userSignInfo.message._id},"secret",{expiresIn:'2h'})


      if(!createUserToken){
        res.status(500).json({message:"JWT Error"})
      }

      res.status(200).json({message:createUserToken})

    } catch (error) {
            res.status(500).json({message:error})        
    }
  }
}
