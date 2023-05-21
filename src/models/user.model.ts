import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from 'config';

export interface UserSchemaModel {
    name: string
    email: string
    phone: string
    password: string
}

export interface UserSchemaInt extends UserSchemaModel {
    createdAt: Date
    updatedAt: Date
    tokens: [{ token: string }]
    resetToken: string
    resetExpire: string
}

// mongoose user schema 
const userSchema = new mongoose.Schema<UserSchemaInt>({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        // select: false
    }
}, {
    timestamps: true
})

// remove password for security reason
userSchema.methods.toJSON = function () {
    const user = this.toObject()
    delete user.password
    return user
}

// hash user password before save it into database
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(config.get<number>('saltRound'))
        this.password = await bcrypt.hash(this.password, salt)
    }
    next()
})

// mongoose user model 
const UserModel = mongoose.model('users', userSchema)

export default UserModel
