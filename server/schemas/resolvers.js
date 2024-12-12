const  User  = require('../models/User');

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
        login: async (parent, { email, password }) => {
            const user = await User.findOne ({ email });
           
            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);
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