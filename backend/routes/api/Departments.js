const express = require("express");
const router = express.Router();
const Department = require("../../models/Department");

// Create 
// Add new department route
router.post('/', async (req, res) => {
    try {
      const { departmentName, professions } = req.body;
  
      // Validate incoming data
      if (!departmentName || !Array.isArray(professions)) {
        return res.status(400).json({ error: 'Invalid input data' });
      }
  
      const newDepartment = new Department({
        departmentName,
        professions
      });
  
      const savedDepartment = await newDepartment.save();
      res.status(201).json(savedDepartment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to add department' });
    }
  });

// Get all 
router.get("/", async (req, res) => {
    try {
        const deps = await Department.find();
        res.status(200).json(deps);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get  by ID
router.get("/:id", async (req, res) => {
    try {
        const dep = await Department.findById(req.params.id);
        if (!dep) return res.status(404).json({ message: "Department not found" });
        res.status(200).json(dep);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update Employee
router.put("/:id", async (req, res) => {
    try {
        const updatedDep = await Department.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedDep) return res.status(404).json({ message: "Department not found" });
        res.status(200).json(updatedDep);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});




// Delete Employee
router.delete("/:id", async (req, res) => {
    try {
        const deleteDep = await Department.findByIdAndDelete(req.params.id);
        if (!deleteDep) return res.status(404).json({ message: "Employee not found" });
        res.status(200).json({ message: "Department deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
