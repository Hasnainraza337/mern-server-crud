const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
    {
        _id: mongoose.Schema.ObjectId,
        firstName: String,
        lastName: String,
        age: Number,
        courses: [String],
        address: {
            street: String,
            city: String,
            state: String,
            zip: String
        }
    },

);

const Students = mongoose.model("students", studentSchema);

module.exports = Students;
