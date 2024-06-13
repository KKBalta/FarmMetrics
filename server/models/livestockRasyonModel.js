const db = require('../config/db');  // Ensure this path correctly points to your database connection module

const LivestockRasyon = {
    getAll: function(callback) {
        return db.query('SELECT * FROM livestock_rasyon', callback);
    },

    getById: function(id, callback) {
        return db.query('SELECT * FROM livestock_rasyon WHERE id = ?', [id], callback);
    },

    getByEartag: function(eartag, callback) {
        return db.query('SELECT * FROM livestock_rasyon WHERE eartag = ?', [eartag], callback);
    },

    create: function(livestockRasyon, callback) {
        return db.query(
            'INSERT INTO livestock_rasyon (eartag, rasyon_id, start_date, end_date) VALUES (?, ?, CURDATE(), NULL)',
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

    delete: function(id, callback) {
        return db.query('DELETE FROM livestock_rasyon WHERE id = ?', [id], callback);
    },

    changeRasyon: function(eartag, rasyon_id, start_date, callback) {
        return db.query(
            'CALL insert_livestock_rasyon(?, ?, ?)',
            [eartag, rasyon_id, start_date],
            callback
        );
    },

    getAllByEartag: function(eartag, callback) {
        return db.query('SELECT * FROM livestock_rasyon WHERE eartag = ? ORDER BY start_date', [eartag], callback);
    }
};

module.exports = LivestockRasyon;
