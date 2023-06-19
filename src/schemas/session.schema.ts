import { object, string, boolean } from "zod";

// create a session schema validation
export const crtSessionSchema = object({
    body: object({
        email: string({})
            .email('Enter a valid email address!')
            .optional(),
        phone: string({})
            .min(11, 'Enter a valid phone number!')
            .max(11, 'Enter a valid phone number!')
            .optional(),
        password: string({
            required_error: 'Password is required!'
        })
    }).strict()
})

// delete a session schema validation
export const delSessionSchema = object({
    body: object({
        keepCurrent: boolean({})
            .optional(),
        removeCurrent: boolean({})
            .optional(),
        removeAll: boolean()
            .optional(),
        removeSpecific: string({})
            .optional()
    }).strict()
})