import jwt, { Secret } from "jsonwebtoken";

export const encode = (
	params: string | object,
	secret: Secret = process.env.JWT_SECRET || "",
): string => {
	const token = jwt.sign(params, secret, {
		expiresIn: process.env.TOKEN_EXPIRATION || "24h",
	});
	return token;
};

export const decode = (
	token: string,
	secret: Secret = process.env.JWT_SECRET || "",
) => {
	const payload = jwt.verify(token, secret);
	return payload;
};
