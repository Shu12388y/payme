import { Account } from "../schema/account.schema";

export class AccountModel {
  static async createAccount({ userid }: { userid: string }) {
    try {
      const accountCreation = new Account({
        userid: userid,
        balance: 0,
      });
      await accountCreation.save();
      return {
        code: 200,
        message: "Created",
      };
    } catch (error) {
      return {
        code: 500,
        message: error,
      };
    }
  }

  static async addBalance({
    userid,
    balance,
  }: {
    userid: string;
    balance: number;
  }) {
    try {
      // @ts-ignore
      const findUserId = await Account.findOne({
        userid: userid,
      });

      if (!findUserId) {
        return {
          code: 404,
          message: "Account not found",
        };
      }

      // @ts-ignore
      await Account.findOneAndUpdate({ userid }, { balance });
    } catch (error) {
      return {
        code: 500,
        mssage: error,
      };
    }
  }

}
