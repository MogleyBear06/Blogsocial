const router = require("express").Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require("../../controllers/userController");

/*
router.get('/', getUsers);
router.post('/', createUser);
*/
// These routes are prefixed with '/users'
router.route("/")
        .get(getUsers)    // --> http GET method
        .post(createUser);  // --> http POST method request

// --> /users/:userId

router.route("/:userId")
        .get(getSingleUser)
        .put(updateUser)
        .delete(deleteUser);

// --> /users/:userId/friends/:friendId

router.route("/:userId/friends/:friendId").post(addFriend)
.delete(removeFriend);


module.exports = router;
