const Group = require('../models/groupModel');

const groupController = {
    getAllGroups: (req, res) => {
        Group.getAllGroups((err, results) => {
            if (err) {
                res.status(500).json({ message: "Error fetching groups", error: err });
            } else {
                res.status(200).json(results);
            }
        });
    },

    getGroupById: (req, res) => {
        const { group_id } = req.params;
        Group.getGroupById(group_id, (err, results) => {
            if (err) {
                res.status(500).json({ message: "Error fetching group", error: err });
            } else if (results.length > 0) {
                res.status(200).json(results[0]);
            } else {
                res.status(404).json({ message: "No group found with the given ID" });
            }
        });
    },

    addGroup: (req, res) => {
        const { group_name } = req.body;
        Group.addGroup({ group_name }, (err, result) => {
            if (err) {
                res.status(500).json({ message: "Error adding group", error: err });
            } else {
                res.status(200).json({ message: "Group added successfully" });
            }
        });
    },

    updateGroup: (req, res) => {
        const { group_id } = req.params;
        const { group_name } = req.body;
        Group.updateGroup(group_id, { group_name }, (err, result) => {
            if (err) {
                res.status(500).json({ message: "Error updating group", error: err });
            } else {
                res.status(200).json({ message: "Group updated successfully" });
            }
        });
    },

    deleteGroup: (req, res) => {
        const { group_id } = req.params;
        Group.deleteGroup(group_id, (err, result) => {
            if (err) {
                res.status(500).json({ message: "Error deleting group", error: err });
            } else {
                res.status(200).json({ message: "Group deleted successfully" });
            }
        });
    }
};

module.exports = groupController;
