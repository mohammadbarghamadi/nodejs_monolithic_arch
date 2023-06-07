import UserModel, { UserSchemaModel, UserSchemaInt } from "../models/user.model";
import { Document, FilterQuery, ObjectId } from "mongoose";
import { randomBytes, createHash } from "node:crypto";

// add user to database 
export const userRegServ = async (data: Document<UserSchemaModel>) => {
    try {
        const user = await UserModel.create(data)
        return user
    } catch (e: any) {
        throw new Error(e)
    }
}

// get user from database
export const userGetServ = async (userId: FilterQuery<UserSchemaInt>) => {
    try {
        return await UserModel.findOne(userId)
    } catch (e: any) {
        throw new Error(e)
    }
}

// find user from database
export const userFndServ = async (query: FilterQuery<UserSchemaInt>) => {
    return await UserModel.findOne(query).lean()
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

// user recovery by email or phone
export const userRecServ = async (email: string, phone: string) => {

    try {
        let user: UserSchemaInt | null = null
        if (email) user = await UserModel.findOne({ email })
        else if (phone) user = await UserModel.findOne({ phone })
        if (!user) return { status: 404, message: 'No user found!' }
        const dataBuffer = randomBytes(40).toString('hex')
        const hashedData = createHash('sha256').update(dataBuffer).digest('hex')
        // const 

    } catch (e) {

    }

    const dataBuffer = randomBytes(32).toString('hex')
    const resetToken = createHash('rsa256').update(dataBuffer).digest('hex')


}