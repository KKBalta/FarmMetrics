const db = require('../config/db');  // Ensure this path correctly points to your database connection module

const RasyonComponents = {
    getAllComponents: function(callback) {
        return db.query('SELECT * FROM RasyonComponents', callback);
    },

    getComponentById: function(id, callback) {
        return db.query('SELECT * FROM RasyonComponents WHERE id = ?', [id], callback);
    },

    getComponentsByRasyonId: function(rasyon_id, callback) {
        return db.query('SELECT * FROM RasyonComponents WHERE rasyon_id = ?', [rasyon_id], callback);
    },

    addComponent: function(component, callback) {
        return db.query(
            'INSERT INTO RasyonComponents (rasyon_id, component_name, dm, amount, price) VALUES (?, ?, ?, ?, ?)',
            [component.rasyon_id, component.component_name, component.dm, component.amount, component.price],
            callback
        );
    },

    updateComponent: function(id, component, callback) {
        return db.query(
            'UPDATE RasyonComponents SET rasyon_id=?, component_name=?, dm=?, amount=?, price=? WHERE id=?',
            [component.rasyon_id, component.component_name, component.dm, component.amount, component.price, id],
            callback
        );
    },

    deleteComponent: function(id, callback) {
        return db.query('DELETE FROM RasyonComponents WHERE id = ?', [id], callback);
    }
};

module.exports = RasyonComponents;
