import express from "express";
import TransactionControllers from "../controllers/transactionControllers";
import {  isLoggedIn } from "../middlewares/authMiddleware";

const router = express();

router
    .post(
        "/",
        isLoggedIn,
        TransactionControllers.create
    )
    .get(
        "/",
        isLoggedIn,
        TransactionControllers.getAll
    )
    .get(
        "/:id", 
        TransactionControllers.getOne
    )
    .put(
        "/:id", 
        TransactionControllers.update
    )
    .delete(
		"/:id",
        TransactionControllers.create
	);


export default router;
