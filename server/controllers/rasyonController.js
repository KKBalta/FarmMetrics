const Rasyon = require('../models/rasyonModel');  // Ensure the path is correct

const rasyonController = {
    getAllRasyons: (req, res) => {
        Rasyon.getAllRasyons((err, results) => {
            if (err) {
                res.status(500).json({ message: "Error fetching Rasyons", error: err });
            } else {
                res.status(200).json(results);
            }
        });
    },

    getRasyonById: (req, res) => {
        const { id } = req.params;  // Assuming id is passed as a URL parameter
        Rasyon.getRasyonById(id, (err, result) => {
            if (err) {
                res.status(500).json({ message: "Error fetching Rasyon", error: err });
            } else if (result.length > 0) {
                res.status(200).json(result[0]);
            } else {
                res.status(404).json({ message: "No Rasyon found with the given ID" });
            }
        });
    },

    addRasyon: (req, res) => {
        const { name, description } = req.body;
        Rasyon.addRasyon({ name, description }, (err, result) => {
            if (err) {
                res.status(500).json({ message: "Error adding Rasyon", error: err });
            } else {
                res.status(201).json({ message: "Rasyon added successfully", data: result });
            }
        });
    },
    
    updateRasyon: (req, res) => {
        const { id } = req.params;
        const { name, description } = req.body;
        
        Rasyon.updateRasyon(id, { name, description }, (err, result) => {
            if (err) {
                res.status(500).json({ message: "Error updating Rasyon", error: err });
            } else {
                res.status(200).json({ message: "Rasyon updated successfully" });
            }
        });
    },

    deleteRasyon: (req, res) => {
        const { id } = req.params;
        Rasyon.deleteRasyon(id, (err, result) => {
            if (err) {
                res.status(500).json({ message: "Error deleting Rasyon", error: err });
            } else {
                res.status(200).json({ message: "Rasyon deleted successfully" });
            }
        });
    }
};

module.exports = rasyonController;
