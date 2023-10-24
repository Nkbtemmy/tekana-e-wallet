import { Response, NextFunction } from "express";
import { config } from "dotenv";

import { decode } from "../../utils/security/jwt";
import CustomerService from "../../services/customerService";

config();

export async function isLoggedIn(req: any, res: Response, next: NextFunction) {
	const header = req.header("Authorization");
	if (!header || !header.startsWith("Bearer ")) {
		return res
			.status(401)
			.send({ message: "Unauthorized access, please login first" })
			.status(401);
	}

	const token = header.split(" ")[1];
	if (!token)
		return res
			.status(400)
			.send({ message: "Unauthorized access, please login first" });
	try {
		const decoded: any = decode(token);

		const user = await CustomerService.findOne({
			id: decoded.id,
			isLoggedIn: true,
		});

		if (!user)
			return res
				.status(404)
				.send({ message: "Unauthorized access, please login first" });
		req.user = user;
		next();
	} catch (err: any) {
		return res
			.status(400)
			.send({ message: "Invalid Bearer Token", error: err.message });
	}
}

export const isAuthorized =
	(...requiredRights: any[]) =>
	async (req: any, res: Response, next: NextFunction) => {
		if (!req.user) return res.status(401).send({ message: "Unauthorized" });
		const { role } = req.user;
		if (!requiredRights.includes(role))
			return res.status(403).send({ message: "Forbidden" });
		next();
	};

