const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema({
    departmentName: { type: String, required: true },
    professions: [{ type: String, required: true }] // Embedded professions
    }, { timestamps: true });

module.exports = mongoose.model("Department", departmentSchema);
