import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from 'config';

export interface UserSchemaModel {
    name: string
    email: string
    phone: string
    password: string
}

export interface UserSchemaInt extends UserSchemaModel, mongoose.Document {
    createdAt: Date
    updatedAt: Date
    tokens: [{ token: string }]
    verifyPassword: (password: string) => Promise<boolean>
    saveResetToken: (resetToken: string) => Promise<boolean>
    resetToken: string
    resetExpire: number
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
    },
    resetToken: String,
    resetExpire: Number
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

// verify user password with bcrypt compare method
userSchema.methods.verifyPassword = async function (password: string) {
    return await bcrypt.compare(password, this.password)
}

// save reset token to database
userSchema.methods.saveResetToken = async function (resetToken: string) {
    const user = this as UserSchemaInt
    user.resetToken = resetToken
    user.resetExpire = Date.now() + 10 * 60 * 1000
    await user.save()
    return true
}

// mongoose user model 
const UserModel = mongoose.model('users', userSchema)

export default UserModel
