const router = require("express").Router()
const { get_courses, update_course, get_course, delete_course, create_course } = require("../controllers/course_controller")

router.get("/courses", get_courses)
router.get("/course/:course_id", get_course)
router.patch("/course/:course_id", update_course)
router.delete("/course/:course_id", delete_course)
router.post("/course", create_course)

module.exports = {
    endpoint: "/api",
    router
}