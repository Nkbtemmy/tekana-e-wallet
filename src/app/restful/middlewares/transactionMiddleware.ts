import { Response, NextFunction } from "express";
import { config } from "dotenv";
import AccountService from "../../services/accountService";

config();

export async function balanceChecker(req: any, res: Response, next: NextFunction) {
    try {
        const { accountId, amount } = req.body;
        const personalAccount = await AccountService.findByPk(accountId);
        
        if (!personalAccount) {
          return res.status(404).json({
            message: "There is no this account on your wallet"
          });
        }
        
        const currentBalance: number = parseFloat(personalAccount.balance);
        const convertedAmount = parseFloat(amount);
        
        if (!(currentBalance >= convertedAmount)) {
          return res.status(404).json({
            message: "Insufficient fund to make this transaction"
          });
        }
        
        return next();
    } catch (error:any) {
        return res.status(500).json({
            message:"server error",
            error: error.message
        })
    }
}
