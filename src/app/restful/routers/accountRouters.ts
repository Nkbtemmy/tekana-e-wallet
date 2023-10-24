import express from "express";
import AccountControllers from "../controllers/accountControllers";
import { isLoggedIn } from "../middlewares/authMiddleware";

const router = express();

router
	.post("/", isLoggedIn, AccountControllers.create)
	.get("/", isLoggedIn, AccountControllers.getAllMyAccount)
	.get("/:id", AccountControllers.getOne)
	.put("/:id", AccountControllers.update)
	.delete("/:id", AccountControllers.create);

export default router;
