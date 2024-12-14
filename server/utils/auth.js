const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server-express');

const secret = 'mysecretsshhhhh';
const expiration = '2h';

function authMiddleware({ req }) {
    let token = req.headers.authorization || '';

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
        console.log('Token verification failed:', err.message);
        console.error('Invalid token', error);
    }

    return req;
}

function signToken({ username, email, _id }) {
    const payload = { username, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
}

module.exports = {
    AuthenticationError,
    authMiddleware,
    signToken,
};
