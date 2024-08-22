const express = require('express');
const router = express.Router();
const borrowController= require("../Controller/borrowController")
const verifyToken= require("../Utilies/verifyToken")


router.route("/").get(verifyToken.protect, borrowController.borrowHistory);

router.route("/:id").patch(verifyToken.protect, borrowController.returnBook).post(verifyToken.protect,borrowController.borrowBook);

router.route("/mostBorrowedBooks").get(borrowController.mostBorrowedBooks);
router.route("/activeMembers").get(borrowController.activeMembers);
router.route("/bookAvailability").get(borrowController.bookAvailability);
module.exports = router;
