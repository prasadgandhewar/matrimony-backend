import bcrypt from 'bcrypt';
import { addUserInDB, findUserByEmail, findUserById } from '../services/user-db.service.js';
import { generateToken, verifyToken } from '../services/auth.service.js';
import { getCache, setCache } from '../services/cache.service.js';

export default async function registerUser(req, res) {
    const { password, email, firstName, lastName, mobileNumber } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = await findUserByEmail(email);
    if (user) {
        return res.status(409).json({ message: 'User already exists' });
    }

    const newUser = await addUserInDB({ firstName, lastName, mobileNumber, email, hashedPassword });
    const token = await generateToken(newUser);
    if (!token) {
        return res.status(500).json({ message: 'Error generating token' });
    }   
    return res.status(201).json({ message: 'User registered successfully', token });
}

export async function loginUser(req, res) {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);
    if (user) {
        const isPasswordValid = bcrypt.compareSync(password, user.hashedPassword);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = await generateToken(user);
        console.log('Generated token:', token);
        res.cookie("auth_token", token, { httpOnly: true, secure: true, sameSite: 'Strict' });
        setCache(`user_${user.id}`, JSON.stringify(user), 3600); // Cache for 1 hour
        return res.status(200).json({ message: 'Login successful' });
    }
 
    return res.status(200).json({ message: 'Login failed' });
}

export async function getUserProfile(req, res) {
    const token = req.cookies.auth_token;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    const userId = verifyToken(token);
    if (!userId) {
        return res.status(401).json({ message: 'Invalid token' });
    }
    const user = await getCache(`user_${userId?.id}`);
    if (!user) {
        const userFromDb = await findUserById(userId?.id);
        setCache(`user_${userId?.id}`, JSON.stringify(userFromDb), 3600);
        res.status(200).json({ user: userFromDb });
    }
    console.log('Decoded user from token:', user);
    res.status(200).json({ user: JSON.parse(user) });
}

export function logoutUser(req, res) {
    // Implement logout logic here
    res.status(200).json({ message: 'Logout successful' });
}

export function resetPassword(req, res) {
    const { email } = req.body;
    // Implement password reset logic here
    res.status(200).json({ message: 'Password reset email sent' });
}