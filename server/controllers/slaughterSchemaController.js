const SlaughterSchema = require('../models/slaughterSchemaModel');  // Ensure the path is correct

const slaughterSchemaController = {
    getAllSlaughters: (req, res) => {
        SlaughterSchema.getAllSlaughters((err, results) => {
            if (err) {
                res.status(500).json({ message: "Error fetching slaughter records", error: err });
            } else {
                res.status(200).json(results);
            }
        });
    },

    getSlaughterById: (req, res) => {
        const { slaughter_id } = req.params;
        SlaughterSchema.getSlaughterById(slaughter_id, (err, result) => {
            if (err) {
                res.status(500).json({ message: "Error retrieving slaughter record", error: err });
            } else if (result.length > 0) {
                res.status(200).json(result[0]);
            } else {
                res.status(404).json({ message: "No slaughter record found with the given ID" });
            }
        });
    },

    addSlaughter: (req, res) => {
        const { eartag, date, carcas_weight, sale_price } = req.body;
        SlaughterSchema.addSlaughter({ eartag, date, carcas_weight, sale_price }, (err, result) => {
            if (err) {
                res.status(500).json({ message: "Error adding slaughter record", error: err });
            } else {
                res.status(201).json({ message: "Slaughter record added successfully", data: result });
            }
        });
    },

    updateSlaughter: (req, res) => {
        const { slaughter_id } = req.params;
        const { eartag, date, carcas_weight, sale_price } = req.body;
        SlaughterSchema.updateSlaughter(slaughter_id, { eartag, date, carcas_weight, sale_price }, (err, result) => {
            if (err) {
                res.status(500).json({ message: "Error updating slaughter record", error: err });
            } else {
                res.status(200).json({ message: "Slaughter record updated successfully" });
            }
        });
    },

    deleteSlaughter: (req, res) => {
        const { slaughter_id } = req.params;
        SlaughterSchema.deleteSlaughter(slaughter_id, (err, result) => {
            if (err) {
                res.status(500).json({ message: "Error deleting slaughter record", error: err });
            } else {
                res.status(200).json({ message: "Slaughter record deleted successfully" });
            }
        });
    }
};

module.exports = slaughterSchemaController;
