const express= require("express")

const router= express.Router()
const bookController= require("../Controller/bookController")
const auth= require("../Utilies/verifyToken")

router.route("/").get(bookController.getallbooks)
router.route("/").get(auth.protect, auth.restrictTo("admin"), bookController.getallbooks).post(auth.protect, auth.restrictTo("admin"), bookController.addBook)

router.route("/:id").put( auth.protect, auth.restrictTo("admin"), bookController.updatebook).delete(auth.protect, auth.restrictTo("admin"), bookController.deleteBook)






module.exports= router
