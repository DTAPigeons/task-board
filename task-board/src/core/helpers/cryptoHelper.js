import crypto from 'crypto-js'

export function getHash(string) {
    var hash = crypto.SHA1(string);
    return hash.toString(crypto.enc.Hex)
}
