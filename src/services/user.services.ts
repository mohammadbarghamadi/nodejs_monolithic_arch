import UserModel, { UserSchemaModel, UserSchemaInt } from "../models/user.model";
import { Document, FilterQuery, Types } from "mongoose";

// add user to database 
export const userRegServ = async (data: Document<UserSchemaModel>) => {
    const user = await UserModel.create(data)
    if (!user) return false
    return user

}

// get user from database
export const userGetServ = async (userId: FilterQuery<UserSchemaInt>) => {
    const user = await UserModel.findOne(userId)
    if (!user) return false
    return user
}

// find user from database
export const userFndServ = async (query: FilterQuery<UserSchemaInt>) => {
    const user = await UserModel.findOne(query).lean()
    if (!user) return user
    return user
}

// update user profile service
export const userUpdServ = async (userId: Types.ObjectId, data: UserSchemaModel) => {
    const user = await UserModel.findOneAndUpdate({ _id: userId }, { ...data }, { returnDocument: 'after' })
    if (!user) return user
    return user
}

// update user password service
export const userUdPServ = async (userId: Types.ObjectId, password: string) => {
    const user = await UserModel.findOne({ _id: userId })
    if (!user) return false
    user.password = password
    return await user.save()
}

// authenticate user with username and password
export const userAutServ = async (email: string | null, phone: string | null, password: string) => {
    try {
        let user: UserSchemaInt | null = null
        if (email) user = await UserModel.findOne({ email })
        else if (phone) user = await UserModel.findOne({ phone })
        if (!user) return false
        const isMatch = await user.verifyPassword(password)
        if (!isMatch) return false
        return user.toJSON()
    } catch (e: any) {
        throw new Error(e)
    }
}

// delete a user account
export const userDelServ = async (userId: FilterQuery<UserSchemaInt>) => {
    try {
        const user = await UserModel.findByIdAndDelete(userId)
        return user
    } catch (e) {
        return e
    }
}