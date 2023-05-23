import UserModel, { UserSchemaModel, UserSchemaInt } from "../models/user.model";
import { Document, ObjectId } from "mongoose";

// add user to database 
export const userRegServ = async (data: Document<UserSchemaModel>) => {
    try {
        // add user to database
        const user = await UserModel.create(data)
        return user
    } catch (e: any) {
        throw new Error(e)
    }
}


// get user from database
export const userGetServ = async () => {
    try {

    } catch (e) {

    }
}

// update user profile service
export const userUpdServ = async (userId: ObjectId, data: Document<UserSchemaModel>) => {
    try {
        const user = await UserModel.findOneAndUpdate({ _id: userId }, { ...data }, { returnDocument: 'after' })
        return user
    } catch (e: any) {
        throw new Error(e)
    }
}

// authenticate user with username and password
export const userAutServ = async (email: string | null, phone: string | null, password: string) => {
    try {
        let user: UserSchemaInt | null = null
        if (email) user = await UserModel.findOne({ email })
        else if (phone) user = await UserModel.findOne({ phone })
        if (!user) return false
        if (!user.verifyPassword(password)) return false
        return user
    } catch (e: any) {
        throw new Error(e)
    }
}