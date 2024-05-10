const FarmerModel = require('../models/farmerModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Get all farmers
exports.getAllFarmers = (req, res) => {
    FarmerModel.getAllFarmers((err, results) => {
        if (err) {
            res.status(500).json({ message: "Error fetching farmers", error: err });
        } else {
            res.status(200).json(results);
        }
    });
};

// Get a single farmer by ID
exports.getFarmerById = (req, res) => {
    const { id } = req.params;
    FarmerModel.getFarmerById(id, (err, results) => {
        if (err) {
            res.status(500).json({ message: "Error fetching farmer", error: err });
        } else if (results.length > 0) {
            res.status(200).json(results[0]);
        } else {
            res.status(404).json({ message: "No farmer found with the given ID" });
        }
    });
};

// Create a new farmer
exports.createFarmer = (req, res) => {
    const { farmer_name, email } = req.body;
    if (!farmer_name || !email) {
        return res.status(400).json({ message: "Farmer name and email are required" });
    }
    
    FarmerModel.addFarmer({ farmer_name, email }, (err, result) => {
        if (err) {
            res.status(500).json({ message: "Error adding farmer", error: err });
        } else {
            res.status(201).json({ message: "Farmer added successfully", data: result });
        }
    });
};

// Update an existing farmer
exports.updateFarmer = (req, res) => {
    const { id } = req.params;
    const { farmer_name, email } = req.body;
    
    FarmerModel.updateFarmer(id, { farmer_name, email }, (err, result) => {
        if (err) {
            res.status(500).json({ message: "Error updating farmer", error: err });
        } else {
            res.status(200).json({ message: "Farmer updated successfully", data: result });
        }
    });
};

// Delete a farmer
exports.deleteFarmer = (req, res) => {
    const { id } = req.params;
    FarmerModel.deleteFarmer(id, (err, result) => {
        if (err) {
            res.status(500).json({ message: "Error deleting farmer", error: err });
        } else {
            res.status(204).json({ message: "Farmer deleted successfully" });
        }
    });
};

exports.signup = async (req, res) => {
    const { farmer_name, email, password } = req.body;

    // Simple validation
    if (!farmer_name || !email || !password) {
        return res.status(400).json({ message: "All fields are required." });
    }

    try {
        // Check if the farmer already exists
        FarmerModel.findFarmerByEmail(email, async (err, results) => {
            if (err) {
                return res.status(500).json({ message: "Database error", error: err });
            }
            if (results.length > 0) {
                return res.status(409).json({ message: "Farmer already registered." });
            }

            // Hash password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // Create new farmer
            FarmerModel.addFarmer({ farmer_name, email, password: hashedPassword }, (error, result) => {
                if (error) {
                    return res.status(500).json({ message: "Database error on farmer creation", error });
                }
                const token = jwt.sign({ id: result.insertId }, process.env.JWT_SECRET, { expiresIn: '24h' });
                res.status(201).json({ message: "Farmer registered successfully!", token });
            });
        });
    } catch (error) {
        res.status(500).json({ message: "Error handling request", error });
    }
};

// Function to handle farmer login
exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required." });
    }

    try {
        FarmerModel.findFarmerByEmail(email, async (err, results) => {
            if (err) {
                return res.status(500).json({ message: "Database error", error: err });
            }
            if (results.length === 0) {
                return res.status(401).json({ message: "Invalid credentials" });
            }

            const farmer = results[0];
            const isMatch = await bcrypt.compare(password, farmer.password);
            if (!isMatch) {
                return res.status(401).json({ message: "Invalid credentials" });
            }

            const token = jwt.sign({ id: farmer.farmer_id }, process.env.JWT_SECRET, { expiresIn: '24h' });
            res.json({ message: "Login successful!", token });
        });
    } catch (error) {
        res.status(500).json({ message: "Error handling request", error });
    }
};