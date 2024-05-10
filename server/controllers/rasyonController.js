const Rasyon = require('../models/rasyonModel');  // Ensure the path is correct

const rasyonController = {
    getAllRasyons: (req, res) => {
        Rasyon.getAllRasyons((err, results) => {
            if (err) {
                res.status(500).json({ message: "Error fetching rasyons", error: err });
            } else {
                res.status(200).json(results);
            }
        });
    },

    getRasyonById: (req, res) => {
        const { id } = req.params;  // Assuming id is passed as a URL parameter
        Rasyon.getRasyonById(id, (err, results) => {
            if (err) {
                res.status(500).json({ message: "Error fetching rasyon", error: err });
            } else if (results.length > 0) {
                res.status(200).json(results[0]);
            } else {
                res.status(404).json({ message: "No rasyon found with the given ID" });
            }
        });
    },

    addRasyon: (req, res) => {
        const { product_name, amount, price, entrance_date, dm } = req.body;
        Rasyon.addRasyon({ product_name, amount, price, entrance_date, dm }, (err, result) => {
            if (err) {
                res.status(500).json({ message: "Error adding rasyon", error: err });
            } else {
                res.status(201).json({ message: "Rasyon added successfully", data: result });
            }
        });
    },
    

    updateRasyon: (req, res) => {
        const { id } = req.params;
        const { product_name, amount, price, entrance_date, dm } = req.body;
        
        let updateQuery = 'UPDATE rasyon SET ';
        let updates = [];
        let values = [];
        
        if (product_name !== undefined) {
            updates.push(' product_name = ? ');
            values.push(product_name);
        }
        if (amount !== undefined) {
            updates.push(' amount = ? ');
            values.push(amount);
        }
        if (price !== undefined) {
            updates.push(' price = ? ');
            values.push(price);
        }
        if (entrance_date !== undefined) {
            updates.push(' entrance_date = ? ');
            values.push(entrance_date);
        }
        if (dm !== undefined) {
            updates.push(' dm = ? ');
            values.push(dm);
        }
    
        if (updates.length === 0) {
            return res.status(400).json({ message: "No valid fields provided for update" });
        }
    
        updateQuery += updates.join(',');
        updateQuery += ' WHERE id = ?';
        values.push(id);
    
        Rasyon.updateRasyonCustom(updateQuery, values, (err, result) => {
            if (err) {
                res.status(500).json({ message: "Error updating rasyon", error: err });
            } else {
                res.status(200).json({ message: "Rasyon updated successfully" });
            }
        });
    },
    

    deleteRasyon: (req, res) => {
        const { id } = req.params;
        Rasyon.deleteRasyon(id, (err, result) => {
            if (err) {
                res.status(500).json({ message: "Error deleting rasyon", error: err });
            } else {
                res.status(200).json({ message: "Rasyon deleted successfully" });
            }
        });
    }
};

module.exports = rasyonController;
