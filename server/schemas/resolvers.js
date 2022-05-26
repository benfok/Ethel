const { AuthenticationError } = require('apollo-server-express');
const { User, List, Category } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    currentUser: async (parent, args, context) => {
        if (context.user) {
          return User.findOne({ _id: context.user._id }).populate({path: 'categories.lists', populate: 'items'});
        }
        throw new AuthenticationError('You need to be logged in!');
    },
    list: async (parent, {listId}, context) => {
      // if (context.user) {
        return List.findById(listId).populate('items');
      // }
      // throw new AuthenticationError('You need to be logged in!');
    }
  },

  Mutation: {
    addUser: async (parent, { firstName, lastName, email, password }) => {
      // insert default category upon user creation
      const categories = [{
        categoryName: "Uncategorized", 
        color: "#8D8896",
        isEditable: false,
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
    addCategory: async (parent, { categoryName, color }, context) => {
      if(context.user) {
          const user = await User.findByIdAndUpdate(
            { _id: context.user._id },
            { $push: { categories: {
                categoryName: categoryName,
                color: color,
                lists: []
            }}},
            { new: true }
          )
          return user
        }
        throw new AuthenticationError('You need to be logged in to add a category');
    },
    addItem: async (parent, { listId, itemText }, context) => {
      if(context.user) {
        const item = await List.findOneAndUpdate(
          { _id: listId },
          { $push: { items: { itemText: itemText } } },
          { new: true }
        )
        return item
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeItem: async (parent, { listId, itemId }, context) => {
      if(context.user) {
        const list = await List.findOneAndUpdate(
          { _id: listId },
          { $pull: { items: { _id: itemId } } },
          { new: true }
        )
        return list;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    toggleItem: async (parent, { listId, itemId, checked }, context) => {
      if(context.user) {
        const item = await List.findOneAndUpdate(
          { _id: listId },
          { $set: { 
              items: { 
                _id: itemId,
                completed: checked
               } } },
          { new: true }
        )
        return item;
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;
