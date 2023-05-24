import path from 'path';
import { readFileSync } from 'fs';

export default {
    port: 8080,
    dbURL: 'mongodb://127.0.0.1:27017/dbname',
    saltRound: 10,
    accTokenTTL: '15m',
    refTokenTTL: '90 days',
    accRSAPubKey: readFileSync(path.join(__dirname, '../keys/RSA256.key.pub'), { encoding: 'utf8' }), // public key for accessToken
    accRSAPriKey: readFileSync(path.join(__dirname, '../keys/RSA256.key'), { encoding: 'utf8' }), // private key for accessToken
    refRSAPubKey: readFileSync(path.join(__dirname, '../keys/REF_RSA256.key.pub'), { encoding: 'utf8' }), // public key for refreshToken
    refRSAPriKey: readFileSync(path.join(__dirname, '../keys/REF_RSA256.key'), { encoding: 'utf8' }), // private key for refreshToken

}