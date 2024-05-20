const db = require('../config/db');  // Ensure this path correctly points to your database connection module

const SlaughterSchema = {
    getAllSlaughters: function(callback) {
        return db.query('SELECT * FROM slaughter_schema', callback);
    },

    getSlaughterById: function(slaughter_id, callback) {
        return db.query('SELECT * FROM slaughter_schema WHERE slaughter_id = ?', [slaughter_id], callback);
    },

    addSlaughter: function(slaughter, callback) {
        return db.query(
            'INSERT INTO slaughter_schema (eartag, date, carcas_weight, sale_price) VALUES (?, ?, ?, ?)',
            [slaughter.eartag, slaughter.date, slaughter.carcas_weight, slaughter.sale_price],
            callback
        );
    },

    updateSlaughter: function(slaughter_id, slaughter, callback) {
        return db.query(
            'UPDATE slaughter_schema SET eartag=?, date=?, carcas_weight=?, sale_price=? WHERE slaughter_id=?',
            [slaughter.eartag, slaughter.date, slaughter.carcas_weight, slaughter.sale_price, slaughter_id],
            callback
        );
    },

    deleteSlaughter: function(slaughter_id, callback) {
        return db.query('DELETE FROM slaughter_schema WHERE slaughter_id = ?', [slaughter_id], callback);
    }
};

module.exports = SlaughterSchema;
