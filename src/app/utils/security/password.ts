import bcrypt from "bcryptjs";

export async function hashPassword(password: any) {
	const hashedPassword = await bcrypt.hash(password, 10);
	return hashedPassword;
}

export async function verifyPassword(password: any, userPassword: any) {
	const isValid = await bcrypt.compare(password, userPassword);
	return isValid;
}
