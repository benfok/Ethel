const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const Category = require('./Category');
const List = require('./List');

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must match an email address!'],
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  categories: [Category.schema],
  shareHistory: [
    // creates an array of objects. This field is the Type of ObjectId (the Mongo specific id). The ref property connects this to the user model.
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    } 
  ],
},    
// options object. Ensure that the virtuals are included.
{
    toJSON: { virtuals: true }
}
);

// Creating a virtual property `categoryCount` and a getter
userSchema.virtual('categoryCount')
    .get(function () {
        return this.categories.length
    });

userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;
