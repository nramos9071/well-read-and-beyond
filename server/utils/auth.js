const { sign } = require('crypto');
const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');

const secret = "readwellsecret";
const expiration = '2h';

const AuthenticationError = new GraphQLError('Authentication Error', { 
    extensions: {
        code: 'UNAUTHENTICATED',
    }
});

function authMiddleware({ req }) {
    let token = req.body.token || req.query.token || req.headers.authorization;

    if (req.headers.authorization) {
        token = token.split(' ').pop().trim();
    }

    if (!token) {
        return req;
    }

    try {
        const { data } = jwt.verify(token, secret, { maxAge: expiration });
        req.user = data;
    } catch {
        console.error('Invalid token');
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
