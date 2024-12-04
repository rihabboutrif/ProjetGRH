const mongoose = require("mongoose");
const { Cascade, constants } = require('@xavisoft/mongoose-cascade');
const { ON_DELETE } = constants;
const absencesSchema = new mongoose.Schema({
    employeeId: {
    type: mongoose.Schema.Types.ObjectId, // References an employee by their ID
    ref: 'Employee', // Assumes you have an Employee model
    required: true,
    onDelete: ON_DELETE.SET_NULL,
  },
    date: { type: Date, required: true },
}, { timestamps: true });

module.exports = mongoose.model("absences", absencesSchema);