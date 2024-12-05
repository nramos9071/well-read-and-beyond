const { User } = require('../models/User');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
        }
        throw AuthenticationError;
        },
    },

};


module.exports = resolvers;