const LiveStockGroup = require('../models/liveStockGroupModel');

const liveStockGroupController = {
    getAllLiveStockGroups: (req, res) => {
        LiveStockGroup.getAllLiveStockGroups((err, results) => {
            if (err) {
                res.status(500).json({ message: "Error fetching live stock groups", error: err });
            } else {
                res.status(200).json(results);
            }
        });
    },

    getLiveStockGroupByLiveStockId: (req, res) => {
        const { live_stock_id } = req.params;
        LiveStockGroup.getLiveStockGroupByLiveStockId(live_stock_id, (err, results) => {
            if (err) {
                res.status(500).json({ message: "Error fetching live stock group", error: err });
            } else if (results.length > 0) {
                res.status(200).json(results);
            } else {
                res.status(404).json({ message: "No live stock group found with the given live stock ID" });
            }
        });
    },

    addLiveStockGroup: (req, res) => {
        const { live_stock_id, group_id } = req.body;
        LiveStockGroup.addLiveStockGroup({ live_stock_id, group_id }, (err, result) => {
            if (err) {
                res.status(500).json({ message: "Error adding live stock group", error: err });
            } else {
                res.status(200).json({ message: "Live stock group added successfully" });
            }
        });
    },

    updateLiveStockGroup: (req, res) => {
        const { live_stock_id, group_id } = req.params;
        const { new_live_stock_id, new_group_id } = req.body;
        LiveStockGroup.updateLiveStockGroup(live_stock_id, group_id, { live_stock_id: new_live_stock_id, group_id: new_group_id }, (err, result) => {
            if (err) {
                res.status(500).json({ message: "Error updating live stock group", error: err });
            } else {
                res.status(200).json({ message: "Live stock group updated successfully" });
            }
        });
    },

    deleteLiveStockGroup: (req, res) => {
        const { live_stock_id, group_id } = req.params;
        LiveStockGroup.deleteLiveStockGroup(live_stock_id, group_id, (err, result) => {
            if (err) {
                res.status(500).json({ message: "Error deleting live stock group", error: err });
            } else {
                res.status(200).json({ message: "Live stock group deleted successfully" });
            }
        });
    }
};

module.exports = liveStockGroupController;
