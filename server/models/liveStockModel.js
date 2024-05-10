const db = require('../config/db');  // Make sure this path is correct based on your project structure

const LiveStock = {
    getAllLivestock: function(callback) {
        return db.query('SELECT * FROM live_stock WHERE is_deleted = 0', callback);
    },

    getLivestockByEartag: function(eartag, callback) {
        return db.query('SELECT * FROM live_stock WHERE eartag = ? AND is_deleted = 0', [eartag], callback);
    },

    addLivestock: function(livestock, callback) {
        return db.query(
            'INSERT INTO live_stock (eartag, farmer_id, race, gender, room, cost) VALUES (?, ?, ?, ?, ?, ?)',
            [livestock.eartag, livestock.farmer_id, livestock.race, livestock.gender, livestock.room, livestock.cost],
            callback
        );
    },

    updateLivestock: function(eartag, livestock, callback) {
        return db.query(
            'UPDATE live_stock SET farmer_id=?, race=?, gender=?, room=?, cost=? WHERE eartag=?',
            [livestock.farmer_id, livestock.race, livestock.gender, livestock.room, livestock.cost, eartag],
            callback
        );
    },
    
    restoreLivestock: function(eartag, callback) {
        return db.query('UPDATE live_stock SET is_deleted = 0 WHERE eartag = ?', [eartag], callback);
    },


    softDeleteLivestock: function(eartag, callback) {
        // New method to perform soft delete
        return db.query('UPDATE live_stock SET is_deleted = 1 WHERE eartag = ?', [eartag], callback);
    },


    deleteLivestock: function(eartag, callback) {
        return db.query('DELETE FROM live_stock WHERE eartag = ?', [eartag], callback);
    }
};

module.exports = LiveStock;
