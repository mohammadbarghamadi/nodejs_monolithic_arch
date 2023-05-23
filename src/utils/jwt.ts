import jwt from 'jsonwebtoken';
import config from 'config';

const rsaPubKey = config.get<string>('rsaPubKey')
const rsaPriKey = config.get<string>('rsaPriKey')

type RSAKeyType = "REF_RSA_KEY" | 'ACC_RSA_KEY'

// JSON Web Token Sign
export const JWTSign = async (object: Object, key: RSAKeyType, options?: jwt.SignOptions | undefined) => {
    return jwt.sign(object, rsaPriKey, { ...options, algorithm: 'RS256' })
}

// JSON Web Token Verify
export const JWTVerify = async (token: string) => {
    try {
        const decoded = jwt.verify(token, rsaPubKey)
        return { valid: true, expired: false, decoded }
    } catch (e: any) {
        return { valid: false, expired: e.message === 'jwt expired', encoded: null }
    }
} 