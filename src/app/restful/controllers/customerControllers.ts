import { Response } from "express";

import CustomerService from "../../services/customerService";
import { hashPassword, verifyPassword } from "../../utils/security/password";
import { encode } from "../../utils/security/jwt";

export default class CustomerControllers{

    static async signup(req:any, res:Response){
        try {
            const { firstName, lastName, email, password, telephoneNumber, address, dateOfBirth} = req.body;
			      const hashedPassword = await hashPassword(password);
            const dob = new Date(dateOfBirth);
            const customerExist = await CustomerService.findOne({email});
            if(customerExist){
                return res.status(401).json({
                    message: " Customer already exist"
                 })
            }

            CustomerService.create({
              firstName,
              lastName,
              email,
              address,
              password: hashedPassword,
              telephoneNumber,
              dateOfBirth:dob
              }).then(resp=>{
                resp.password =undefined;
                const data = {
                    message: "Signed Up Successfully",
                    data: resp,
                };
                return res.status(201).json({
                  ...data
                })

              }).catch((error:any)=>{
                return res.status(403).json({
                    message: " some thing went wrong",
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

    static async signIn(req: any, res: Response) {
      const { email, password } = req.body;
      try {
        const user = await CustomerService.findOne({email});
        if (!user) {
                  return res.status(404).json({
                      message: "Email or/and password is not correct.",
                  });
        }
        const foundUser = user.toJSON();
        const isEqual = await verifyPassword(password, foundUser.password);
        if (!isEqual) {
          return res.status(404).json({
            message: "Email or/and password is not correct.",
          });
        }

        if (!user.isLoggedIn) {
          user.isLoggedIn = true;
          user.save();
        }
        foundUser.password = undefined;
        const token: string = encode({ ...foundUser });
              return res.status(200).json({
          message: "login successfully",
          token,
        });
      } catch (error: any) {
        return res.status(500).json({
          message: "server error",
          error: error.message,
        });
      }
    }

    static async logOut(req: any, res: Response) {
      const { id } = req.user;
      try {
        let user = await CustomerService.findByPk(id);
        user.set("isLoggedIn", 0);
        user = await user.save();
        const outUser = user.toJSON();

        return res.status(201).json({
          message: "logout successfully",
          user: {
            id: outUser.id,
            firstName: outUser.firstName,
          },
        })
      } catch (error: any) {
        return res.status(500).json({
          message: "server error",
          error: error.message,
        });
      }
    }

    static async getAll(req:any, res:Response){
        try {
           CustomerService.getAll().then((resp)=>{
            return res.status(200).json({
              message: "customers retreived successfuly",
              data:resp
            })
           }).catch((error)=>{
            return res.status(401).json({
              message: "fail to retreive customers",
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

    static async profile(req:any, res:Response){
        try {
            const { id } = req.user;
            const user = await CustomerService.findByPk(id);
            if(!user){
              return res.status(404).json({
                message: "customer not found",
              })   
            }
            user.password = undefined;
            return res.status(200).json({
              message: "customer profile retreived",
              data:user
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
          const user = await CustomerService.findByPk(id);
          if(!user){
            return res.status(404).json({
              message: "customer not found",
            })   
          }
          user.password = undefined;
          return res.status(200).json({
            message: "customer retreived successfully",
            data:user
          }) 
        } catch (error:any) {
          return res.status(500).json({
            message: "server error",
            error:error.message
          })  
        }
    }

}