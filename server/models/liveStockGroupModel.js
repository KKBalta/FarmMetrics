const db = require('../config/db');

const LiveStockGroup = {
    getAllLiveStockGroups: function(callback) {
        return db.query('SELECT * FROM live_stock_groups', callback);
    },

    getLiveStockGroupByLiveStockId: function(live_stock_id, callback) {
        return db.query('SELECT * FROM live_stock_groups WHERE live_stock_id = ?', [live_stock_id], callback);
    },

    addLiveStockGroup: function(live_stock_group, callback) {
        return db.query(
            'INSERT INTO live_stock_groups (live_stock_id, group_id) VALUES (?, ?)',
            [live_stock_group.live_stock_id, live_stock_group.group_id],
            callback
        );
    },

    updateLiveStockGroup: function(live_stock_id, group_id, live_stock_group, callback) {
        return db.query(
            'UPDATE live_stock_groups SET live_stock_id = ?, group_id = ? WHERE live_stock_id = ? AND group_id = ?',
            [live_stock_group.live_stock_id, live_stock_group.group_id, live_stock_id, group_id],
            callback
        );
    },

    deleteLiveStockGroup: function(live_stock_id, group_id, callback) {
        return db.query('DELETE FROM live_stock_groups WHERE live_stock_id = ? AND group_id = ?', [live_stock_id, group_id], callback);
    }
};

module.exports = LiveStockGroup;
