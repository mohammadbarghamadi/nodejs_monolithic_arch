import path from 'path';
import { readFileSync } from 'fs';

export default {
    port: 8080,
    dbURL: 'mongodb://127.0.0.1:27017/dbname',
    saltRound: 10,
    rsaPubKey: readFileSync(path.join(__dirname, '../keys/RSA256.key.pub')),
    rsaPriKey: readFileSync(path.join(__dirname, '../keys/RSA256.key'))
}