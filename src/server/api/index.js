const router = require("express").Router();

const volleyball = require('volleyball')
router.use(volleyball)

router.use("/cartItem", require("./cartItem"));
router.use("/customer", require("./customer"));
router.use("/orderDetail", require("./orderDetail"));
router.use("/orderItem", require("./orderItem"));
router.use("/paymentDetail", require("./paymentDetail"));
router.use("/product", require("./product"));
router.use("/productCategory", require("./productCategory"));
router.use("/shoppingSession", require("./shoppingSession"));
// router.use("/stripe"), require("./stripe")


module.exports = router;