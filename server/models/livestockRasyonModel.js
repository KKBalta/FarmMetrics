const db = require('../config/db');  // Make sure this path correctly points to your database connection module

const LivestockRasyon = {
    
    getAll: function(callback) {
        return db.query('SELECT * FROM livestock_rasyon', callback);
    },

    getById: function(id, callback) {
        return db.query('SELECT * FROM livestock_rasyon WHERE id = ?', [id], callback);
    },

    // Create a new livestock rasyon record
    create: function(livestockRasyon, callback) {
        return db.query(
            'INSERT INTO livestock_rasyon (eartag, rasyon_id, start_date, end_date) VALUES (?, ?, CURDATE(),NULL)',
            [livestockRasyon.eartag, livestockRasyon.rasyon_id],
            callback
        );
    },
    
    update: function(id, livestockRasyon, callback) {
        return db.query(
            'UPDATE livestock_rasyon SET eartag=?, rasyon_id=?, start_date=?, end_date=? WHERE id=?',
            [livestockRasyon.eartag, livestockRasyon.rasyon_id, livestockRasyon.start_date, livestockRasyon.end_date, id],
            callback
        );
    },


    // Delete a livestock rasyon record
    delete: function(id, callback) {
        return db.query('DELETE FROM livestock_rasyon WHERE id = ?', [id], callback);
    }
};

////CALL insert_livestock_rasyon('6944', 2, CURRENT_DATE()); when inserting new 

module.exports = LivestockRasyon;
