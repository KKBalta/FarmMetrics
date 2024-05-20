const RasyonComponents = require('../models/rasyonComponentsModel');  // Ensure the path is correct

const rasyonComponentsController = {
    getAllComponents: (req, res) => {
        RasyonComponents.getAllComponents((err, results) => {
            if (err) {
                res.status(500).json({ message: "Error fetching components", error: err });
            } else {
                res.status(200).json(results);
            }
        });
    },

    getComponentById: (req, res) => {
        const { id } = req.params;
        RasyonComponents.getComponentById(id, (err, result) => {
            if (err) {
                res.status(500).json({ message: "Error fetching component", error: err });
            } else if (result.length > 0) {
                res.status(200).json(result[0]);
            } else {
                res.status(404).json({ message: "No component found with the given ID" });
            }
        });
    },

    getComponentsByRasyonId: (req, res) => {
        const { rasyon_id } = req.params;
        RasyonComponents.getComponentsByRasyonId(rasyon_id, (err, results) => {
            if (err) {
                res.status(500).json({ message: "Error fetching components for the rasyon", error: err });
            } else {
                res.status(200).json(results);
            }
        });
    },

    addComponent: (req, res) => {
        const { rasyon_id, component_name, dm, amount, price } = req.body;
        RasyonComponents.addComponent({ rasyon_id, component_name, dm, amount, price }, (err, result) => {
            if (err) {
                res.status(500).json({ message: "Error adding component", error: err });
            } else {
                res.status(201).json({ message: "Component added successfully", data: result });
            }
        });
    },

    updateComponent: (req, res) => {
        const { id } = req.params;
        const { rasyon_id, component_name, dm, amount, price } = req.body;

        RasyonComponents.updateComponent(id, { rasyon_id, component_name, dm, amount, price }, (err, result) => {
            if (err) {
                res.status(500).json({ message: "Error updating component", error: err });
            } else {
                res.status(200).json({ message: "Component updated successfully" });
            }
        });
    },

    deleteComponent: (req, res) => {
        const { id } = req.params;
        RasyonComponents.deleteComponent(id, (err, result) => {
            if (err) {
                res.status(500).json({ message: "Error deleting component", error: err });
            } else {
                res.status(200).json({ message: "Component deleted successfully" });
            }
        });
    }
};

module.exports = rasyonComponentsController;
