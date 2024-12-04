const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    profession: { type: String, required: true }, // Selected profession
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
    salary: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Employee", employeeSchema);
