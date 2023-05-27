import jwt from 'jsonwebtoken';
import config from 'config';
import { UserSchemaInt } from '../models/user.model';
import { Types } from 'mongoose';

const keys = {
    accPriKey: config.get<string>('accRSAPriKey'),
    refPriKey: config.get<string>('refRSAPriKey'),
    accPubKey: config.get<string>('accRSAPubKey'),
    refPubKey: config.get<string>('refRSAPubKey')
}

type RSAKeyType = "REF_RSA_KEY" | 'ACC_RSA_KEY'

interface JWTDecodedObj { user: UserSchemaInt, session: Types.ObjectId }

// JSON Web Token Sign
export const JWTSign = async (object: Object, key: RSAKeyType, options?: jwt.SignOptions | undefined) => {

    const priKey = key === 'ACC_RSA_KEY' ? keys.accPriKey : keys.refPriKey
    return jwt.sign(object, priKey, { ...options, algorithm: 'RS256' })
}

// JSON Web Token Verify
export const JWTVerify = async (token: string, key: RSAKeyType) => {

    const pubKey = key === 'ACC_RSA_KEY' ? keys.accPubKey : keys.refPubKey
    try {
        const decoded = jwt.verify(token, pubKey) as JWTDecodedObj | null
        return { valid: true, expired: false, decoded }
    } catch (e: any) {
        return { valid: false, expired: e.message === 'jwt expired', decoded: null }
    }
}