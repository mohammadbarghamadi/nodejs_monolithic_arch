import { object, string, TypeOf } from 'zod'


export const userRegSchema = object({
    body: object({
        name: string({
            required_error: 'Name is required!'
        }),

        password: string({
            required_error: 'Password is required!'
        })
            .min(7, 'Password does not meet match our criteria - 7 chars at least!'),

        email: string({
            required_error: 'Email is required!'
        })
            .email('Please enter a valid email address!'),

        phone: string({
            required_error: 'Phone is required!'
        })
            .min(11, 'Enter a valid phone number!')
            .max(11, 'Enter a valid phone number!')

    }).strict('Invalid field!')
})

export const userUpdSchema = object({
    body: object({
        name: string({})
            .optional(),

        email: string({})
            .email('Please enter a valid email address!')
            .optional(),

        phone: string({})
            .min(11, 'Enter a valid phone number!')
            .max(11, 'Enter a valid phone number!')
            .optional()
    }).strict('Invalid field!')
})

export const userUdPSchema = object({
    body: object({
        password: string({
            required_error: 'Password is required!'
        })
    }).strict('Invalid field!')
})