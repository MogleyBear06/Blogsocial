const router = require("express").Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  deleteThought,
  updateThought,
  createReaction,
  deleteReaction,
} = require("../../controllers/thoughtController");

// --> /thoughts
router.route("/").get(getThoughts).get(getSingleThought).post(createThought);

// --> /thoughts/:thoughtId
router.route("/:thoughtId").put(updateThought).delete(deleteThought);

// --> /thoughts/:thoughtId/reactions

router
  .route("/:thoughtId/reactions")
  .post(createReaction)
  .delete(deleteReaction);

module.exports = router;
