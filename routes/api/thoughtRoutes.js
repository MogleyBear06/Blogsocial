const router = require("express").Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  deleteThought,
  updateThought,
  addReaction,
  removeReaction,
} = require("../../controllers/thoughtController");

// --> /thoughts
router.route("/").get(getThoughts).get(getSingleThought).post(createThought);

// --> /thoughts/:thoughtId
router.route("/:thoughtId").put(updateThought).delete(deleteThought);

// --> /thoughts/:thoughtId/reactions

router
  .route("/:thoughtId/reactions")
  .post(addReaction)
  
// --> /thoughts/:thoughtId/reactions/:reactionId  
  router
  .route("/:thoughtId/reactions/:reactionId")
  .delete(removeReaction);

module.exports = router;
