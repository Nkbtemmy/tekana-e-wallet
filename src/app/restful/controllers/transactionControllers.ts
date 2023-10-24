import { Response } from "express";

import TransactionService from "../../services/transactionService";

export default class TransactionControllers{

    static async create(req:any, res:Response){
        try {
            const { id } = req.user;
            const walletExist = await TransactionService.findByPk(id);
            if(walletExist){
                return res.status(401).json({
                    message: " You have already created created Wallet"
                 })
            }

            TransactionService.create({
              walletId:id
              }).then(resp=>{
                        const data = {
                            message: "Wallet created Successfully",
                            data: resp,
                        };
                        return res.status(201).json({
                          ...data
                        })

              }).catch((error:any)=>{
                return res.status(403).json({
                    message: " fail to create wallet",
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

    static async getAll(req:any, res:Response){
      try {
         TransactionService.getAll().then((resp)=>{
          return res.status(200).json({
            message: "wallets retreived successfuly",
            data:resp
          })
         }).catch((error)=>{
          return res.status(401).json({
            message: "fail to retreive wallets",
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
          const wallet = await TransactionService.findByPk(id);
          if(!wallet){
            return res.status(404).json({
              message: "wallet not found",
            })   
          }
          return res.status(200).json({
            message: "wallet retreived successfully",
            data:wallet
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
        const { id: walletId } = req.params;
        const wallet = await TransactionService.findOne({
          customerId,
          walletId
        });
        if(!wallet){
          return res.status(404).json({
            message: "wallet not found",
          })   
        }
        wallet.set({...req.body})
        await wallet.save();
        return res.status(200).json({
          message: "wallet updated successfully",
          data:wallet
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
        const { id: walletId } = req.params;
        const wallet = await TransactionService.findOne({
          customerId,
          walletId
        });
        if(!wallet){
          return res.status(404).json({
            message: "wallet not found",
          })   
        }
        await TransactionService.delete(walletId).then(()=>{
          return res.status(200).json({
            message: "wallet deleted successfully"
          }) 
        }).catch((error)=>{
          return res.status(200).json({
            message: "wallet fail to be deleted",
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