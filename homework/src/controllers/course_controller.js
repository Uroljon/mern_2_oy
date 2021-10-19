const fs = require("fs/promises")
const path = require("path")
const slugify = require("slugify")

module.exports = class course_controller {
    static async get_courses(req, res) {
        let db = await fs.readFile(path.join(__dirname, "..", "modules", "db.json"));
        let { courses } = JSON.parse(db)

        res.status(200).json({
            ok: true,
            message: "here is all course list",
            courses
        })
    }
    static async get_course(req, res) {
        let db = await fs.readFile(path.join(__dirname, "..", "modules", "db.json"));
        let { courses } = JSON.parse(db)
        let { course_id } = req.params
        let found = courses.find((course) => course.course_id === Number(course_id))
        if (found) {
            res.status(200).json({
                ok: true,
                id: course_id,
                course: found
            })
        } else {
            res.status(404).json({
                ok: false,
                message: "Course not found"
            })
        }
    }
    static async update_course(req, res) {
        let db = await fs.readFile(path.join(__dirname, "..", "modules", "db.json"), "utf-8");
        db = JSON.parse(db)
        let { course_id } = req.params
        let found_index = db.courses.findIndex((course) => course.course_id === Number(course_id))
        if (found_index < 0) {
            res.status(404).json({
                ok: false,
                message: "Course not found"
            })
            return
        }
        db.courses[found_index] = {
            ...db.courses[found_index],
            ...req.body
        }
        await fs.writeFile(path.join(__dirname, "..", "modules", "db.json"), JSON.stringify(db))
        res.status(201).json({
            ok: true,
            updated: db.courses[found_index]
        })
    }
    static async delete_course(req, res) {
        let db = await fs.readFile(path.join(__dirname, "..", "modules", "db.json"), "utf-8");
        db = JSON.parse(db)
        let { course_id } = req.params
        let found_index = db.courses.findIndex((course) => course.course_id === Number(course_id))
        if (found_index < 0) {
            res.status(404).json({
                ok: false,
                message: "Course not found"
            })
            return
        }
        db.courses.splice(found_index, 1)
        await fs.writeFile(path.join(__dirname, "..", "modules", "db.json"), JSON.stringify(db))
        res.status(201).json({
            ok: true,
            deleted_course_id: course_id,
            all_courses: db.courses
        })
    }
    static async create_course(req, res) { 
        let db = await fs.readFile(path.join(__dirname, "..", "modules", "db.json"), "utf-8");
        db = JSON.parse(db)
        let course_id = db.courses.length+1;

        let new_course = {
            course_id,
            ...req.body
        }
        db.courses.push(new_course)
        await fs.writeFile(path.join(__dirname, "..", "modules", "db.json"), JSON.stringify(db))
        res.status(201).json({
            ok: true,
            new_course
        })
    }

}
