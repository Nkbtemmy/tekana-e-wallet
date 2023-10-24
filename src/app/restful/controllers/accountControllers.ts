import { Response } from "express";

import AccountService from "../../services/accountService";
import WalletService from "../../services/walletService";

export default class AccountControllers{

    static async create(req:any, res:Response){
        try {
            const { id: customerId } = req.user;
            const { accountType } = req.body;
            const customerWalletId = await WalletService.getWalletIdByCustomerId(customerId)
            const accountExist = await AccountService.findOne({
              walletId:customerWalletId,
              accountType
            });
            if(accountExist){
                return res.status(401).json({
                    message: " You have already created this account"
                 })
            }

            AccountService.create({
              walletId:customerWalletId, accountType
              }).then(resp=>{
                        const data = {
                            message: "account created Successfully",
                            data: resp,
                        };
                        return res.status(201).json({
                          ...data
                        })

              }).catch((error:any)=>{
                return res.status(403).json({
                    message: " fail to create account",
                    error: error.message
                 })
            })
        } catch (error:any) {
          return res.status(500).json({
            message: "server error",
            error:error.message
          })  
        }
    }

    static async getAllMyAccount(req:any, res:Response){
      try {
          const { id: customerId } = req.user;
          const customerWalletId = await WalletService.getWalletIdByCustomerId(customerId)
         AccountService.findAllAndCount({walletId:customerWalletId}).then((resp)=>{
          return res.status(200).json({
            message: "accounts retreived successfuly",
            data:resp
          })
         }).catch((error)=>{
          return res.status(401).json({
            message: "fail to retreive accounts",
            error:error.message
          })  
         })
      } catch (error:any) {
        return res.status(500).json({
          message: "server error",
          error:error.message
        })  
      }
    }

    static async getOne(req:any, res:Response){
        try {
          const { id } = req.params;
          const account = await AccountService.findByPk(id);
          if(!account){
            return res.status(404).json({
              message: "account not found",
            })   
          }
          return res.status(200).json({
            message: "account retreived successfully",
            data:account
          }) 
        } catch (error:any) {
          return res.status(500).json({
            message: "server error",
            error:error.message
          })  
        }
    }

    static async update(req:any, res:Response){
      try {
        const {  id : customerId } = req.user;
        const { id: accountId } = req.params;
        const account = await AccountService.findOne({
          customerId,
          accountId
        });
        if(!account){
          return res.status(404).json({
            message: "account not found",
          })   
        }
        account.set({...req.body})
        await account.save();
        return res.status(200).json({
          message: "account updated successfully",
          data:account
        }) 
      } catch (error:any) {
        return res.status(500).json({
          message: "server error",
          error:error.message
        })  
      }
    }

    static async delete(req:any, res:Response){
      try {
        const {  id : customerId } = req.user;
        const { id: accountId } = req.params;
        const account = await AccountService.findOne({
          customerId,
          accountId
        });
        if(!account){
          return res.status(404).json({
            message: "account not found",
          })   
        }
        await AccountService.delete(accountId).then(()=>{
          return res.status(200).json({
            message: "account deleted successfully"
          }) 
        }).catch((error)=>{
          return res.status(200).json({
            message: "account fail to be deleted",
            error:error.message
          }) 
        })
      } catch (error:any) {
        return res.status(500).json({
          message: "server error",
          error:error.message
        })  
      }
    }

}