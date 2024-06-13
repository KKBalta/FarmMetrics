const db = require('../config/db');

const Group = {
    getAllGroups: function(callback) {
        return db.query('SELECT * FROM groups', callback);
    },

    getGroupById: function(group_id, callback) {
        return db.query('SELECT * FROM groups WHERE group_id = ?', [group_id], callback);
    },

    addGroup: function(group, callback) {
        return db.query(
            'INSERT INTO groups (group_name) VALUES (?)',
            [group.group_name],
            callback
        );
    },

    updateGroup: function(group_id, group, callback) {
        return db.query(
            'UPDATE groups SET group_name = ? WHERE group_id = ?',
            [group.group_name, group_id],
            callback
        );
    },

    deleteGroup: function(group_id, callback) {
        return db.query('DELETE FROM groups WHERE group_id = ?', [group_id], callback);
    }
};

module.exports = Group;
