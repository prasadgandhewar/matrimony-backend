import AppDataSource from "../core/datasource.js";
import User from "../entities/user.js";

const userRepo = AppDataSource.getRepository(User);

export async function addUserInDB(userData) {
    const user = userRepo.create(userData);
    await userRepo.save(user);
    return user;
}

export async function findUserByEmail(email) {
    const user = await userRepo.findOneBy({ email });
    console.log('findUserByEmail:', user);
    return user;
}

export async function findUserById(id) {
    const user = await userRepo.findOneBy({ id });
    console.log('findUserById:', user);
    return user;
}
