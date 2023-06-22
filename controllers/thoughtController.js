const { Schema, model, types } = require('mongoose').Types;
const { User, Thought, Reaction} = require('../models');


module.exports = {
  // Get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find().populate("reactions");
      res.json(thoughts);

    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // Get a single thought
  async getSingleThought(req, res) {
    try {
      const oneThought = await Thought.findOne({ _id: req.params.thoughtId })
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

  // Create reaction
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      {
        _id: req.params.thoughtId,
      },
      {
        $addToSet: { reactions: req.body },
      },
      {
        runValidators: true,
        new: true,
      }
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res
            .status(404)
            .json({ message: "User with this Id does not exist." });
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Delete a reaction
  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          return res
            .status(404)
            .json({ message: "Thought with this Id does not exist." });
        }
        res.json(dbThoughtData);
      })
      // if error occur catch the error.
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

};
