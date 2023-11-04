const express = require("express");
const router = express.Router();
const Students = require("../models/studentSchema");
const mongoose = require("mongoose");



// create Studesnts
router.post("/addStudents", async (req, res) => {
    console.log(req.body)
    const { firstName, lastName, age, courses, address } = req.body
    try {
        const studentData = new Students({
            _id: new mongoose.Types.ObjectId(),
            firstName, lastName, age, courses, address

        });
        const result = await studentData.save();
        res.json(result);
    } catch (error) {
        console.log("error", error)
        res.json("something went wrong when adding students")
    }
})

// get students
// Read users data
router.get("/students", async (req, res) => {
    const studentsData = await Students.find();
    res.json(studentsData);
});

// delete students
router.delete("/deleteStudent/:id", async (req, res) => {
    try {
        const studentId = req.params.id;
        const deletedStudent = await Students.findByIdAndRemove(studentId);
        console.log("deletedUser : ", deletedStudent);

        if (!deletedStudent) {
            return res.status(404).json({ message: "student not found!" });
        }

        return res.json({ message: "student deleted successfuly!" });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

// update students
router.put("/updateStudent/:id", async (req, res) => {
    try {
        const { firstName, lastName, age, courses, address } = req.body
        const studentId = req.params.id;
        const studentUpdate = new Students({
            firstName, lastName, age, courses, address
        });

        const updatedStudents = await Students.findByIdAndUpdate(studentId, studentUpdate, {
            new: true,
        });
        console.log("updatedData : ", updatedStudents);

        if (!updatedStudents) {
            return res.status(404).json({ message: "student not found!" });
        }

        return res.json({ message: "Student updated successfuly!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



module.exports = router;