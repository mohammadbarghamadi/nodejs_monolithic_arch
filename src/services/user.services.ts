import UserModel from "../models/user.model";
import { Document, ObjectId } from "mongoose";
import { UserSchemaModel } from "../models/user.model";

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
        const user = await UserModel.findOneAndUpdate({ _id: userId }, { ...data })
        console.log(user)
        return user
    } catch (e: any) {
        throw new Error(e)
    }
}