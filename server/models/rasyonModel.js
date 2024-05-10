const db = require('../config/db');  // Ensure this path correctly points to your database connection module

const Rasyon = {
    getAllRasyons: function(callback) {
        return db.query('SELECT * FROM rasyon', callback);
    },

    getRasyonById: function(id, callback) {
        return db.query('SELECT * FROM rasyon WHERE id = ?', [id], callback);
    },

    addRasyon: function(rasyon, callback) {
        return db.query(
            'INSERT INTO rasyon (product_name, amount, price, entrance_date, dm) VALUES (?, ?, ?, ?, ?)',
            [rasyon.product_name, rasyon.amount, rasyon.price, rasyon.entrance_date || new Date(), rasyon.dm], // Ensure dm is included
            callback
        );
    },
    
    updateRasyon: function(id, rasyon, callback) {
        return db.query(
            'UPDATE rasyon SET product_name=?, amount=?, price=?, entrance_date=?, dm=? WHERE id=?',
            [rasyon.product_name, rasyon.amount, rasyon.price, rasyon.entrance_date, rasyon.dm, id], // Include dm in the parameters
            callback
        );
    },    

    updateRasyonCustom: function(query, values, callback) {
        return db.query(query, values, callback);
    },
    

    deleteRasyon: function(id, callback) {
        return db.query('DELETE FROM rasyon WHERE id = ?', [id], callback);
    }
};

module.exports = Rasyon;
