const LivestockRasyon = require('../models/livestockRasyonModel');

const livestockRasyonController = {
    getAll: (req, res) => {
        LivestockRasyon.getAll((err, results) => {
            if (err) {
                res.status(500).json({ message: "Error fetching livestock rasyons", error: err });
            } else {
                res.status(200).json(results);
            }
        });
    },

    getById: (req, res) => {
        const { id } = req.params;
        LivestockRasyon.getById(id, (err, result) => {
            if (err) {
                res.status(500).json({ message: "Error fetching livestock rasyon", error: err });
            } else if (result.length > 0) {
                res.status(200).json(result[0]);
            } else {
                res.status(404).json({ message: "No livestock rasyon found with the given ID" });
            }
        });
    },

    create: (req, res) => {
        const { eartag, rasyon_id } = req.body;
        LivestockRasyon.create({ eartag, rasyon_id }, (err, result) => {
            if (err) {
                res.status(500).json({ message: "Error creating livestock rasyon", error: err });
            } else {
                res.status(201).json({ message: "Livestock rasyon created successfully", data: result });
            }
        });
    },


    update: (req, res) => {
        const { id } = req.params;
        const { eartag, rasyon_id, start_date, end_date } = req.body;
        LivestockRasyon.update(id, { eartag, rasyon_id, start_date, end_date }, (err, result) => {
            if (err) {
                res.status(500).json({ message: "Error updating livestock rasyon", error: err });
            } else {
                res.status(200).json({ message: "Livestock rasyon updated successfully", data: result });
            }
        });
    },

    delete: (req, res) => {
        const { id } = req.params;
        LivestockRasyon.delete(id, (err, result) => {
            if (err) {
                res.status(500).json({ message: "Error deleting livestock rasyon", error: err });
            } else {
                res.status(200).json({ message: "Livestock rasyon deleted successfully" });
            }
        });
    }
};
//CALL insert_livestock_rasyon('6944', 2, CURRENT_DATE()); when inserting new 

module.exports = livestockRasyonController;
