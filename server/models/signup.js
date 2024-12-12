const { User } = require('./User');

// This function handles signing up new users
const signUpUser = async ({ username, password }) => {
    try {
        // Make sure they sent both a username and password
        if (!username || !password) {
            throw new Error('you need a username and password to sign up!');
        }

        // Check if someone already has this username
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            throw new Error('Oops, that username is taken. Pick another one!');
        }

        // If everything's good, create the new user
        const newUser = await User.create({ username, password });
        return newUser; // Send back the new user info
    } catch (error) {
        // If anything goes wrong, throw the error so it can be handled
        throw error;
    }
};

module.exports = { signUpUser };
