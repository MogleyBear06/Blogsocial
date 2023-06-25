const router = require('express').Router();
const thoughtRoutes = require("./api/thoughtRoutes");
const userRoutes = require("./api/userRoutes");

router.use('/api/thoughts', thoughtRoutes);
router.use('/api/users', userRoutes);

/*
router.get('/', (req, res) => {
    res.json({ msg: "Hit Home Route" })
})
*/

router.use((req, res) => res.send('Wrong route!'));

module.exports = router;
