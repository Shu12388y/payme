import { Auth } from "../schema/auth.schema";
import { AccountModel } from "../../account/models/account.models";

export class AuthModel {
  static async createUser({
    email,
    password,
    firstname,
    lastname,
    phonenumber,
  }: {
    email: string;
    password: string;
    firstname: string;
    lastname: string;
    phonenumber: string;
  }) {
    try {
      // @ts-ignore
      const findIsUserExist = await Auth.findOne({
        email: email,
      });
      if (findIsUserExist) {
        return {
          code: 301,
          message: "User already exist",
        };
      }

      const createNewUser = await new Auth({
        email,
        password,
        firstname,
        lastname,
        phonenumber,
      });

        // create user account
      await AccountModel.createAccount({ userid: createNewUser._id });

      await createNewUser.save();

      return {
        code: 201,
        message: "Created",
      };
    } catch (error) {
      return {
        code: 500,
        message: error,
      };
    }
  }

  static async signInUser({
    email,
    password,
    comparePassword,
  }: {
    email: string;
    password: string;
    comparePassword: (p1: string, p2: string) => Promise<Boolean>;
  }) {
    try {
      // @ts-ignore
      const isUserExist = await Auth.findOne({ email: email });
      if (!isUserExist) {
        return {
          code: 404,
          message: "User not found",
        };
      }

      const checkPassword = comparePassword(password, isUserExist.password);

      if (!checkPassword) {
        return {
          code: 403,
          message: "Unauthorized",
        };
      }

      return {
        code: 200,
        message: isUserExist._id,
      };
    } catch (error) {
      return {
        code: 500,
        message: error,
      };
    }
  }

  static async findUser({ phonenumber }: { phonenumber: string }) {
    try {
      // @ts-ignore
      const finduserInfo = await Auth.findOne({
        phonenumber: phonenumber,
      });

      if (!finduserInfo) {
        return {
          code: 404,
          message: "User not found",
        };
      }

      return {
        code: 200,
        message: finduserInfo,
      };
    } catch (error) {
      return {
        code: 500,
        message: error,
      };
    }
  }

  static async updateUser({
    userid,
    email,
    firstname,
    lastname,
    phonenumber,
  }: {
    userid: string;
    email: string;
    firstname: string;
    lastname: string;
    phonenumber: string;
  }) {
    try {
      // @ts-ignore
      const isUserExists = await Auth.findById(userid);
      if (!isUserExists) {
        return {
          code: 404,
          message: "User not found",
        };
      }

      // @ts-ignore
      await Auth.findByIdAndUpdate(
        { userid },
        {
          email,
          firstname,
          lastname,
          phonenumber,
        }
      );
      return {
        code: 200,
        message: "Info updated",
      };
    } catch (error) {
      return {
        code: 500,
        message: error,
      };
    }
  }
}
