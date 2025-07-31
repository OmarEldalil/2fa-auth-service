import {dataSource} from "../database/db";
import {User} from "../models/user";

const userRepository = dataSource.getRepository(User);

export const storeUser = async (user: {
    name: string,
    email: string,
    phone: string,
    password: string
}): Promise<User> => {
    const userEntity = new User();
    userEntity.name = user.name;
    userEntity.email = user.email;
    userEntity.phone_number = user.phone;
    userEntity.password = user.password;

    return await userRepository.save(userEntity);
}

export const findUserById = async (id: string): Promise<User | null> => {
    return await userRepository.findOne({
        where: {
            id: id
        }
    })
};

export const findUserByPhone = async (phoneNumber: string): Promise<User | null> => {
    return await userRepository.findOne({
        where: {
            phone_number: phoneNumber
        }
    })
};

export const findUserByEmailOrPhone = async (email: string, phone: string): Promise<User | null> => {
    return await userRepository.createQueryBuilder().where("email = :email", {email}).orWhere("phone_number = :phone", {phone}).getOne();
};


export const updateUserById = async (id: string, updates: Partial<Pick<User, 'email' | 'name' | 'password'>>) => {
    return await userRepository.update(id, updates)
};
