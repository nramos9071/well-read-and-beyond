const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server-express');

const secret = 'mysecretsshhhhh';
const expiration = '7d';

function authMiddleware({ req }) {
    let token = req.headers.authorization || '';

    if (process.env.MONGODB_URI === 'development') {
        console.log('Extracted token:', token);
        console.log('Token verified, user:', req.user);
    }

    if (token) {
        token = token.split(' ').pop().trim();
        console.log('Extracted token:', token);
    }

    if (!token) {
        console.log('No token provided');
        return req;
    }

    try {
        const { data } = jwt.verify(token, secret, { maxAge: expiration });
        req.user = data;
        console.log('Token verified, user:', req.user);
    } catch (error) {
        console.error('Authentication Error:', error);  // This should log the actual error
        throw new AuthenticationError('Invalid or expired token');
    }

    return req;
}

function signToken({ username, email, _id }) {
    const payload = { username, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: '7d' });
}

module.exports = {
    AuthenticationError,
    authMiddleware,
    signToken,
};
