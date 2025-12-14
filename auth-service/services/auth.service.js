import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'change-this-secret';
const JWT_EXP = process.env.JWT_EXP || '7d';

export function verifyToken(token) {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded;
    } catch (err) {
        throw new Error('Invalid token');
    }
}

export async function generateToken(user) {
    const tokenRes = await jwt.sign({id: user.id}, JWT_SECRET, { expiresIn: JWT_EXP });
    return tokenRes;
}

export function verifyPassword(plainPassword, hashedPassword) {
    return bcrypt.compareSync(plainPassword, hashedPassword);
}