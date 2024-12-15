const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');
// const { google } = require('googleapis'); // Import Google API client


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
      const user = await User.create({ username, email, password });

      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { username, password }) => {
      console.log(`Attempting to log in user: ${username}`);
      const user = await User.findOne({ username });

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

    updateUserBio: async (parent, { bio }, context) => {
      if (context.user) {
        return await User.findOneAndUpdate({ _id: context.user._id },
          { bio },
          { new: true });
      }
      throw new AuthenticationError('Not logged in');
    },

    saveBooks: async (parent, { book }, context) => {
      console.log('Received book input:', book);
      console.log('Context User:', context.user);

      if (context.user) {
        try {
          const updatedUser = await User.findByIdAndUpdate(
            context.user._id,
            { $push: { savedBooks: book } },
            { new: true }
          );
          console.log('Updated user:', updatedUser);
          return {
            _id: updatedUser._id,
            email: updatedUser.email,
            username: updatedUser.username,
            savedBooks: updatedUser.savedBooks
          };
        } catch (error) {
          console.error('Error updating user:', error);
          throw new Error('Error saving book');
        }
      } else {
        console.error('User not authenticated');
        throw new AuthenticationError('You need to be logged in!');
      }
    },


    removeUser: async (parent, args, context) => {
      if (context.user) {
        return User.findOneAndDelete({ _id: context.user._id });
      }
      throw new AuthenticationError('Not logged in');
    },

  },

  // User: {

  //   savedBooks: async (parent) => {
  //     if (!parent.accessToken) {
  //       return []; // Return empty array if no access token is available
  //     }

  //     // Initialize the Google Books API client with the stored access token
  //     const booksApi = google.books({ version: 'v1', auth: parent.accessToken });

  //     try {
  //       // Make the API request to fetch books from the user's Google Books account
  //       const response = await booksApi.mylibrary.bookshelves.list();

  //       // If response contains bookshelves, map them to the format expected by the schema
  //       if (response.data.items) {
  //         return response.data.items.map(item => ({
  //           title: item.volumeInfo.title,
  //           authors: item.volumeInfo.authors?.join(', ') || 'Unknown',
  //           _id: item.id
  //         }));
  //       }

  //       return []; // Return empty array if no books found
  //     } catch (error) {
  //       console.error('Error fetching saved books:', error);
  //       return []; // Return empty array in case of error
  //     }
  //   },
  // },


};


module.exports = resolvers;