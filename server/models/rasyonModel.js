const db = require('../config/db');  // Ensure this path correctly points to your database connection module

const Rasyon = {
    getAllRasyons: function(callback) {
        return db.query('SELECT * FROM Rasyon', callback);
    },

    getRasyonById: function(id, callback) {
        return db.query('SELECT * FROM Rasyon WHERE id = ?', [id], callback);
    },

    addRasyon: function(Rasyon, callback) {
        return db.query(
            'INSERT INTO Rasyon (name, description) VALUES (?, ?)',
            [Rasyon.name, Rasyon.description],
            callback
        );
    },
    
    updateRasyon: function(id, Rasyon, callback) {
        return db.query(
            'UPDATE Rasyon SET name=?, description=? WHERE id=?',
            [Rasyon.name, Rasyon.description, id],
            callback
        );
    },

    deleteRasyon: function(id, callback) {
        return db.query('DELETE FROM Rasyon WHERE id = ?', [id], callback);
    }
};

module.exports = Rasyon;
