

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const crypto = require('crypto');

const ALGORITHM = 'aes-256-gcm';
const KEY = Buffer.from(process.env.DB_ENCRYPTION_KEY, 'hex');

function encrypt(plaintext) {
    const iv = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv(ALGORITHM, KEY, iv);

    const encrypted = Buffer.concat([
        cipher.update(plaintext, 'utf8'),
        cipher.final()
    ]);
    const authTag = cipher.getAuthTag();

    // Сохраняем iv + authTag + данные вместе
    return Buffer.concat([iv, authTag, encrypted]).toString('base64');
}

function decrypt(ciphertext) {
    const buf = Buffer.from(ciphertext, 'base64');

    const iv      = buf.slice(0, 12);
    const authTag = buf.slice(12, 28);
    const data    = buf.slice(28);

    const decipher = crypto.createDecipheriv(ALGORITHM, KEY, iv);
    decipher.setAuthTag(authTag);

    return Buffer.concat([
        decipher.update(data),
        decipher.final()
    ]).toString('utf8');
}




async function hashPassword(password) {
    return bcrypt.hash(password, 10);
}

async function comparePassword(password, hash) {
    return bcrypt.compare(password, hash);
}


function generateAccessToken(user_id, role) {
    return jwt.sign(
        { user_id, role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    );
}


function generateRefreshToken(user_id) {
    return jwt.sign(
        { user_id },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN }
    );
}

function verifyAccessToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
}

function verifyRefreshToken(token) {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
}

function generateGUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0, // random integer between 0 and 15
            v = c === 'x' ? r : (r & 0x3 | 0x8); // bitwise operations to handle 'y' and 'x'
        return v.toString(16);
    });
}

module.exports = {
    hashPassword,
    comparePassword,
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken,
    verifyRefreshToken,
    encrypt,
    decrypt,
    generateGUID};