const { AuthenticationError } = require('apollo-server-express');
const { User, List, Category } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate({path: 'categories.lists', populate: 'items'});
    },
    user: async (parent, { email }) => {
      return User.findOne({ email }).populate({path: 'categories.lists', populate: 'items'});
    },
    currentUser: async (parent, args, context) => {
        if (context.user) {
          return User.findOne({ _id: context.user._id }).populate({path: 'categories.lists', populate: 'items'});
        }
        throw new AuthenticationError('You need to be logged in!');
    },
    category: async (parent, args, context) => {
        // if (context.user) {
            return Category.findById(args.id).populate('lists');
        // }
        // throw new AuthenticationError('You need to be logged in!');
    }
  },

  Mutation: {
    addUser: async (parent, { firstName, lastName, email, password }) => {
      // insert default category upon user creation
      const categories = [{
        categoryName: "New Lists", 
        color: "#8D8896",
        lists: []
      }];
      const user = await User.create({ firstName, lastName, email, password, categories });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      //isCorrectPassword is set on the User model
      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
  },
};

module.exports = resolvers;
