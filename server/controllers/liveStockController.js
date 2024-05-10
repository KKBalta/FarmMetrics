const LiveStock = require('../models/liveStockModel');

const livestockController = {
    getAllLivestock: (req, res) => {
        LiveStock.getAllLivestock((err, results) => {
            if (err) {
                res.status(500).json({ message: "Error fetching livestock", error: err });
            } else {
                res.status(200).json(results);
            }
        });
    },

    getLivestockByEartag: (req, res) => {
        const { eartag } = req.params;  // Assuming eartag is passed as a URL parameter
        LiveStock.getLivestockByEartag(eartag, (err, results) => {
            if (err) {
                res.status(500).json({ message: "Error fetching livestock", error: err });
            } else if (results.length > 0) {
                res.status(200).json(results[0]);
            } else {
                res.status(404).json({ message: "No livestock found with the given eartag" });
            }
        });
    },

// In your livestockController.js
    addLivestock: (req, res, next) => {
        const { eartag, farmer_id, race, gender, room, cost } = req.body;
        LiveStock.addLivestock({ eartag, farmer_id, race, gender, room, cost }, (err, result) => {
            if (err) {
                res.status(500).json({ message: "Error adding livestock", error: err });
            } else {
                res.status(200).json({ message: "Livestock updated successfully" });
            }
        });
 
    },
    
    

    updateLivestock: (req, res) => {
        const { eartag } = req.params;  // Assuming eartag is passed as a URL parameter
        const { farmer_id, race, gender, room, cost } = req.body;
        LiveStock.updateLivestock(eartag, { farmer_id, race, gender, room, cost }, (err, result) => {
            if (err) {
                res.status(500).json({ message: "Error updating livestock", error: err });
            } else {
                res.status(200).json({ message: "Livestock updated successfully" });
            }
        });
    },
    
    deleteLivestock: (req, res) => {
        const { eartag } = req.params;
        LiveStock.softDeleteLivestock(eartag, (err, result) => {
            if (err) {
                // It's a good idea to check for foreign key constraints or other specific errors to handle them accordingly
                if (err.code === "ER_ROW_IS_REFERENCED_2") {
                    res.status(409).json({ message: "Cannot delete livestock as it is referenced in other records", error: err });
                } else {
                    res.status(500).json({ message: "Error deleting livestock", error: err });
                }
            } else if (result.affectedRows === 0) {
                // If no rows are affected, the eartag was not found
                res.status(404).json({ message: "No livestock found with the given eartag" });
            } else {
                // Success response should not change, as from the client's perspective, the record is "deleted"
                res.status(200).json({ message: "Livestock deleted successfully" });
            }
        });
    },

    // Optional: restoreLivestock method to allow undeleting
    restoreLivestock: (req, res) => {
        const { eartag } = req.params;
        LiveStock.restoreLivestock(eartag, (err, result) => {
            if (err) {
                res.status(500).json({ message: "Error restoring livestock", error: err });
            } else if (result.affectedRows === 0) {
                res.status(404).json({ message: "No livestock found with the given eartag or it was not deleted" });
            } else {
                res.status(200).json({ message: "Livestock restored successfully" });
            }
        });
    },

    hardDeleteLivestock: (req, res) => {
        const { eartag } = req.params;
        LiveStock.deleteLivestock(eartag, (err, result) => {
            if (err) {
                res.status(500).json({ message: "Error deleting livestock", error: err });
            } else {
                res.status(200).json({ message: "Livestock deleted successfully" });
            }
        });
    }    
};
module.exports = livestockController;
