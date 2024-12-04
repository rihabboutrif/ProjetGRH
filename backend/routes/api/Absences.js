const express = require("express");
const router = express.Router();
const Absences = require("../../models/Absences");

router.get("/", async (req, res) => {
  try {
    // Récupérer toutes les absences et peupler employeeId avec les détails de l'employé
    const absences = await Absences.find().populate({
      path: 'employeeId', // Le nom de la clé étrangère dans le schéma Absences
      select: 'name _id', // Sélectionnez les champs nécessaires
    });

    // Retourner les absences sous forme de JSON
    res.status(200).json(absences);
  } catch (err) {
    // En cas d'erreur
    res.status(500).json({ error: err.message });
  }
});
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await Absences.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }
    res.status(200).json({ message: 'Absence supprimé avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression de l\'utilisateur', error });
  }
});

router.post("/save-date", async (req, res) => {
    const { date, employeeId } = req.body;
  
    if (!date || !employeeId) {
      return res.status(400).json({ message: "Date et ID employé requis." });
    }
  
    try {
      // Créer une absence dans MongoDB
      const newAbsence = new Absences({ date, employeeId });
      await newAbsence.save();
  
      res.status(201).json({ message: "Date enregistrée avec succès." });
    } catch (error) {
      console.error("Erreur lors de l'enregistrement dans MongoDB :", error);
      res.status(500).json({ message: "Erreur serveur." });
    }
  });
 router.get('/absences', async (req, res) => {
    try {
      const { date } = req.query; // date passée en paramètre de la requête
      const startOfDay = new Date(date);
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);
  
      const absences = await Absences.find({
        date: { $gte: startOfDay, $lte: endOfDay }
      });
  
      res.status(200).json(absences);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Erreur lors de la récupération des absences' });
    }
  });
  
  module.exports = router;