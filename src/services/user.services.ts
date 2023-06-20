import UserModel, { UserSchemaInt, UserSchemaModel } from "../models/user.model";
import { FilterQuery, ObjectId, Types, FlattenMaps } from "mongoose";


export interface UserServReturnObj {
    status: number
    success: boolean
    messsage?: string
    data?: (FlattenMaps<UserSchemaInt> & { _id: Types.ObjectId; }) | null
}

// add user to database 
export const userRegServ = async (data: UserSchemaModel) => {

    try {

        const user = await UserModel.create(data)
        return { success: true, status: 201, data: user }

    } catch (e: any) {

        if (e.code === 11000)
            return { success: false, status: 409, message: e.message }
        else
            return { success: false, status: 500, message: e.message }

    }

}

// get user from database
export const userGetServ = async (userId: ObjectId) => {

    try {

        const user = await UserModel.findOne(userId)
        if (!user) return { success: false, status: 404, message: `No user with this Id: ${userId} found!` }

        return { success: true, status: 200, data: user }

    } catch (e: any) {

        return { success: false, status: 500, message: e.message }

    }
}

// find user from database
export const userFndServ = async (query: FilterQuery<UserSchemaInt>) => {

    try {

        const user = await UserModel.findOne(query).lean()
        if (!user) return { success: false, status: 404, message: `No user Found with this: ${query}` }

        return { success: true, status: 200, data: user }

    } catch (e: any) {

        return { success: false, status: 500, message: e.message }

    }
}

// update user profile service
export const userUpdServ = async (userId: Types.ObjectId, data: Omit<UserSchemaModel, 'password'>) => {

    try {

        const user = await UserModel.findOneAndUpdate({ _id: userId }, { ...data }, { returnDocument: 'after' })

        if (!user) return { success: false, status: 404, message: `No user with this Id: ${userId} found!` }

        return { success: true, status: 200, data: user }

    } catch (e: any) {

        return { success: false, status: 500, message: e.message }

    }

}

// update user password service
export const userUdPServ = async (userId: Types.ObjectId, password: string) => {

    try {

        const user = await UserModel.findOne({ _id: userId })
        if (!user) return { success: false, status: 404, message: `No user with this Id: ${userId} found!` }

        user.password = password
        const saved = await user.save()

        return { success: true, status: 200, data: saved }

    } catch (e: any) {

        return { success: false, status: 500, message: e.message }

    }
}

// authenticate user with username and password
export const userAutServ = async (email: string | null, phone: string | null, password: string) => {

    try {

        let user: UserSchemaInt | null = null

        if (email) user = await UserModel.findOne({ email })
        else if (phone) user = await UserModel.findOne({ phone })

        if (!user) return { success: false, status: 401, message: `Invalid Username or password!` }

        const isMatch = await user.verifyPassword(password)

        if (!isMatch) return { success: false, status: 401, message: `Invalid Username or password!` }

        return { success: true, status: 200, data: user.toJSON() }

    } catch (e: any) {

        throw new Error(e)

    }
}

// delete a user account
export const userDelServ = async (userId: ObjectId) => {

    try {

        const user = await UserModel.findByIdAndDelete(userId)

        return { success: true, status: 200, data: user }

    } catch (e: any) {

        return { success: false, status: 500, message: e.message }

    }

}