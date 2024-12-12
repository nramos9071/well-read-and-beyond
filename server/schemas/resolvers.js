const  User  = require('../models/User');
const jwt = require('jsonwebtoken');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');


const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },

    user: async (parent, { userId }) => {
        return User.findOne({ _id: userId });
    },

    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
        }
        throw AuthenticationError;
        },
    },

    Mutation: {

        signUp: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password});

            const token = signToken(user);

            return { token, user };
        },
        login: async (parent, { username, password }) => {
            console.log(`Attempting to log in user: ${username}`);
            const user = await User.findOne ({ username });
           
            if (!user) {
                console.log('User not found');
                throw new AuthenticationError('Incorrect user');
            }

            const correctPw = await user.isCorrectPassword(password);
            console.log(`Password comparison result: ${correctPw}`);

            if (!correctPw) {
                console.log('Incorrect password');
                throw new AuthenticationError('Incorrect password');
            }

            const token = signToken(user);
            console.log('Login successful');
            return { token, user };


        },

        removeUser: async (parent, args, context) => {
            if (context.user) {
                return User.findOneAndDelete({_id: context.user._id});
            }
            throw new AuthenticationError('Not logged in');
        },

    }

};


module.exports = resolvers;