const db = require('../config/db');  // Adjust the path as necessary

const Farmer = {
    getAllFarmers: function(callback) {
        return db.query('SELECT * FROM farmer', callback);
    },
    getFarmerById: function(id, callback) {
        return db.query('SELECT * FROM farmer WHERE farmer_id = ?', [id], callback);
    },
    addFarmer: function(farmer, callback) {
        db.query(
            'INSERT INTO farmer (farmer_name, email, password) VALUES (?, ?, ?)',
            [farmer.farmer_name, farmer.email, farmer.password], callback
        );
    },
    updateFarmer: function(id, farmer, callback) {
        return db.query(
            'UPDATE farmer SET farmer_name=?, email=? WHERE farmer_id=?',
            [farmer.farmer_name, farmer.email, id], callback
        );
    },
    
    findFarmerByEmail: function(email, callback) {
        db.query('SELECT * FROM farmer WHERE email = ?', [email], function(err, results) {
            callback(err, results);
        });
    },


    deleteFarmer: function(id, callback) {
        return db.query('DELETE FROM farmer WHERE farmer_id=?', [id], callback);
    }
    
};

module.exports = Farmer;
