const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');


// Schema to create a User model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      trim: true,
      minLength: 1,
      maxLength: 280,
    }, 

    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    createdAt: {
      type: Date,
      default: Date.now,
      get: (date) => date.toISOString().split("T")[0],
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
