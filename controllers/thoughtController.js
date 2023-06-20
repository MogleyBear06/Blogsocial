const { Scehma, model, types } = require('mongoose').Types;
const { User, Thought, reactionSchema } = require('../models');


module.exports = {
  // Get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await thought.find().populate("reactions");
      res.json(thoughts);

    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // Get a single thought
  async getSingleThought(req, res) {
    try {
      const oneThought = await thought.findOne({ _id: req.params.thoughtId })
        .select('-__v');

      if (!oneThought) {
        return res.status(404).json({ message: 'No thought with that ID' })
      }

      res.json(oneThought);

    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // Create a new thought
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thoughts: thought._id } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({
          message: "Thought created, but found no User with that ID ",
        });
      }
      res.json("Created thought");
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

// Update thought
  async updateThought(req, res) {
    try {
      const updatedThought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        req.body,
        { new: true }
      );

      if (!updatedThought) {
        return res.status(404).json({
          message: "No Thought with such ID",
        });
      }

      res.json("Thought updated successfully");
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Delete a thought
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

      if (!thought) {
        return res.status(404).json({ message: 'No such thought exists' });
      }

      res.json({ message: 'Thought successfully deleted' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async createReaction(req, res) {
    try {
      const thoughtId = req.params.thoughtId;
      const newReaction = {
        reactionId: new Types.ObjectId(),
        reactionBody: req.body.reactionBody,
        username: req.body.username,
        createdAt: new Date(),
      };

      const thought = await Thought.findOneAndUpdate(
        { _id: thoughtId },
        { $push: { reactions: newReaction } },
        { new: true }
      );

      if (!thought) {
        return res.status(404).json({
          message: "No Thought with such ID",
        });
      }

      res.json("Reaction created and thought updated successfully");
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Delete a reaction
  async deleteReaction(req, res) {
    try {
      const thoughtId = req.params.thoughtId;
      const reactionId = req.body.reactionId;

      const thought = await Thought.findByIdAndUpdate(
        thoughtId,
        { $pull: { reactions: { reactionId: reactionId } } },
        { new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: "No thought with this id!" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

};
