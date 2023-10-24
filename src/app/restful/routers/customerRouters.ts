import express from "express";
import CustomerControllers from "../controllers/customerControllers";
import {  isLoggedIn } from "../middlewares/authMiddleware";

const router = express();

router
    .get(
        "/", 
        CustomerControllers.getAll
    )
	.post(
		"/signup",
        CustomerControllers.signup
	)
	.post(
        "/login", 
        CustomerControllers.signIn
    )
	.get(
        "/profile", 
        isLoggedIn, 
        CustomerControllers.profile
    )
	.put(
        "/logout", 
        isLoggedIn, 
        CustomerControllers.logOut
    )
    .get(
        "/:id", 
        CustomerControllers.getOne
    );


export default router;
