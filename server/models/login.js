const { User } = require('./User'); // Get the User model

// Function to log in a user
const loginUser = async ({ username, password }) => {
  try {
    // Look for the user by their username
    const user = await User.findOne({ username });
    if (!user) {
      throw new Error('No user found with this username. Please sign up.');
    }

    // Check if the password is correct
    const isPasswordCorrect = await user.isCorrectPassword(password);
    if (!isPasswordCorrect) {
      throw new Error('Incorrect password. Please try again.');
    }

    return { message: 'Login successful!', user }; // If everything's good, return the user
  } catch (error) {
    throw error; // If there's an error, throw it
  }
};

module.exports = { loginUser }; // Export the function so it can be used elsewhere

