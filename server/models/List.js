const { Schema, model } = require('mongoose');
const { formatDate } = require('../utils/utils');

// created as a nested schema within users
const itemSchema = new Schema({
    itemText: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
    completed: {
      type: Boolean,
      required: true,
      default: false,
    },
    deleted: {
      type: Boolean,
      required: true,
      default: false,
    },
    },
    {
        _id: false
    }
);

  const listSchema = new Schema({
    listName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 30,
    },
    owner: {
        type: Schema.Types.ObjectId
    },
    items: [itemSchema],
    sharedWith: [
        // creates an array of objects. This field is the Type of ObjectId (the Mongo specific id). The ref property connects this to the user model.
        {
          type: Schema.Types.ObjectId,
          ref: 'User'
        } 
    ],
    createdAt: {
        type: Date,
        default: Date.now(),
        get: formatDate
    },
  },
 // options object. Ensure that the virtuals are included.
    {
        toJSON: { virtuals: true }
    }
);

// Creating a virtual property `itemCount` and a getter
listSchema.virtual('itemCount')
    .get(function () {
        return this.items.length
    });

const List = model('List', listSchema);

module.exports = List;