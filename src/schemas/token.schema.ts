import { object, string } from "zod";


export const crtResetTokenSchema = object({
    body: object({
        email: string({})
            .email('Enter a valid email address!')
            .optional(),
        phone: string({})
            .min(11, 'Enter a valid phone number!')
            .max(11, 'Enter a valid phone number!')
            .optional()
    }).strict('Email or phone number is required!')
})


export const resUserPasswordSchema = object({
    body: object({
        password: string({
            required_error: 'Password is required!'
        })
    }).strict(),
    params: object({
        resetToken: string({
            required_error: 'Reset Token is required!'
        })
    }).strict('Invalid parameter!')
})