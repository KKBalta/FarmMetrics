const MonthlyWeight = require('../models/montlyWeightModel');  // Ensure the path is correct

const monthlyWeightController = {
    getAllWeights: (req, res) => {
        MonthlyWeight.getAllWeights((err, results) => {
            if (err) {
                res.status(500).json({ message: "Error fetching monthly weights", error: err });
            } else {
                res.status(200).json(results);
            }
        });
    },

    getWeightById: (req, res) => {
        const { record_id } = req.params;  // Assuming record_id is passed as a URL parameter
        MonthlyWeight.getWeightById(record_id, (err, results) => {
            if (err) {
                res.status(500).json({ message: "Error fetching monthly weight", error: err });
            } else if (results.length > 0) {
                res.status(200).json(results[0]);
            } else {
                res.status(404).json({ message: "No monthly weight found with the given ID" });
            }
        });
    },

    addWeight: (req, res) => {
        const { eartag, record_date, weight } = req.body;
        MonthlyWeight.addWeight({ eartag, record_date, weight }, (err, result) => {
            if (err) {
                res.status(500).json({ message: "Error adding monthly weight", error: err });
            } else {
                res.status(201).json({ message: "Monthly weight added successfully", data: result });
            }
        });
    },

    updateWeight: (req, res) => {
    const { record_id } = req.params; // Assuming record_id is passed as a URL parameter
    const { eartag, record_date, weight } = req.body;
    
    // Prepare SQL query and values dynamically based on provided fields
    let updateQuery = 'UPDATE monthly_weight SET ';
    let updates = [];
    let values = [];
    
    if (eartag !== undefined) {
        updates.push(' eartag = ? ');
        values.push(eartag);
    }
    if (record_date !== undefined) {
        updates.push(' record_date = ? ');
        values.push(record_date);
    }
    if (weight !== undefined) {
        updates.push(' weight = ? ');
        values.push(weight);
    }

    if (updates.length === 0) {
        return res.status(400).json({ message: "No valid fields provided for update" });
    }

    updateQuery += updates.join(',');
    updateQuery += ' WHERE record_id = ?';
    values.push(record_id);

    MonthlyWeight.updateWeightCustom(updateQuery, values, (err, result) => {
        if (err) {
            res.status(500).json({ message: "Error updating monthly weight", error: err });
        } else {
            res.status(200).json({ message: "Monthly weight updated successfully" });
        }
    });
},
getDailyGainAll: (req, res) => {
    MonthlyWeight.getDailyGainAll((err, results) => {
        if (err) {
            res.status(500).json({ message: "Error fetching daily gains for all eartags", error: err });
        } else {
            res.status(200).json(results);
        }
    });
},

// New controller function for getDailyGain
getDailyGain: (req, res) => {
    const { eartag } = req.params; // Assuming eartag is passed as a URL parameter
    MonthlyWeight.getDailyGain(eartag, (err, results) => {
        if (err) {
            res.status(500).json({ message: `Error fetching daily gain for eartag ${eartag}`, error: err });
        } else if (results.length > 0) {
            res.status(200).json(results);
        } else {
            res.status(404).json({ message: `No daily gain found for eartag ${eartag}` });
        }
    });
},

// New controller function for getDailyGainAvg
getDailyGainAvg: (req, res) => {
    const { eartag } = req.params; // Assuming eartag is passed as a URL parameter
    MonthlyWeight.getDailyGainAvg(eartag, (err, results) => {
        if (err) {
            res.status(500).json({ message: `Error fetching average daily gain for eartag ${eartag}`, error: err });
        } else if (results.length > 0) {
            res.status(200).json(results[0]);
        } else {
            res.status(404).json({ message: `No average daily gain found for eartag ${eartag}` });
        }
    });
},

getWeightsByEartag: (req, res) => {
    const { eartag } = req.params;  // Assuming eartag is passed as a URL parameter
    MonthlyWeight.getWeightsByEartag(eartag, (err, results) => {
        if (err) {
            res.status(500).json({ message: "Error fetching monthly weights", error: err });
        } else if (results.length > 0) {
            res.status(200).json(results);
        } else {
            res.status(404).json({ message: "No monthly weights found for the given eartag" });
        }
    });
},
    deleteWeight: (req, res) => {
        const { record_id } = req.params;
        MonthlyWeight.deleteWeight(record_id, (err, result) => {
            if (err) {
                res.status(500).json({ message: "Error deleting monthly weight", error: err });
            } else {
                res.status(200).json({ message: "Monthly weight deleted successfully" });
            }
        });
    }
};

module.exports = monthlyWeightController;
