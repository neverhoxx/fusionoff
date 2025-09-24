import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

export interface JwtPayload {
    userId: string;
}

export function generateToken(payload: JwtPayload) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
}

export function verifyToken(token: string): JwtPayload | null {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        if (typeof decoded === "object" && "userId" in decoded) {
            return decoded as JwtPayload;
        }
        return null;
    } catch {
        return null;
    }
}
