const db = require('../config/db');  // Ensure this path correctly points to your database connection module

const MonthlyWeight = {
    getAllWeights: function(callback) {
        return db.query('SELECT * FROM monthly_weight', callback);
    },

    getWeightById: function(record_id, callback) {
        return db.query('SELECT * FROM monthly_weight WHERE record_id = ?', [record_id], callback);
    },

    addWeight: function(weight, callback) {
        return db.query(
            'INSERT INTO monthly_weight (eartag, record_date, weight) VALUES (?, ?, ?)',
            [weight.eartag, weight.record_date || new Date(), weight.weight], // Assuming default to current date if not provided
            callback
        );
    },

    updateWeight: function(record_id, weight, callback) {
        return db.query(
            'UPDATE monthly_weight SET eartag=?, record_date=?, weight=? WHERE record_id=?',
            [weight.eartag, weight.record_date, weight.weight, record_id],
            callback
        );
    },

    updateWeightCustom: function(query, values, callback) {
        return db.query(query, values, callback);
    },
    
    getDailyGainAll: function(callback) {
        const sql = `
            SELECT 
                current.eartag,
                current.record_date,
                current.weight AS current_weight,
                previous.weight AS previous_weight,
                DATEDIFF(current.record_date, previous.record_date) AS days_between,
                (current.weight - previous.weight) / DATEDIFF(current.record_date, previous.record_date) AS daily_gain
            FROM 
                monthly_weight AS current
            INNER JOIN 
                monthly_weight AS previous ON current.eartag = previous.eartag
            WHERE
                previous.record_date = (
                    SELECT MAX(record_date)
                    FROM monthly_weight
                    WHERE eartag = current.eartag AND record_date < current.record_date
                )
            ORDER BY 
                current.eartag, current.record_date;
        `;
        return db.query(sql, callback);
    },

    getDailyGain: function(eartag, callback) {
        const sql = `
            SELECT 
                current.eartag,
                current.record_date,
                current.weight AS current_weight,
                previous.weight AS previous_weight,
                DATEDIFF(current.record_date, previous.record_date) AS days_between,
                (current.weight - previous.weight) / GREATEST(DATEDIFF(current.record_date, previous.record_date), 1) AS daily_gain
            FROM 
                monthly_weight AS current
            INNER JOIN 
                monthly_weight AS previous ON current.eartag = previous.eartag
            WHERE
                current.eartag = ? AND
                previous.record_date = (
                    SELECT MAX(record_date)
                    FROM monthly_weight
                    WHERE eartag = ? AND record_date < current.record_date
                )
            ORDER BY 
                current.eartag, current.record_date;
        `;
        return db.query(sql, [eartag, eartag], callback);
    },

    getDailyGainAvg: function (eartag, callback) {
        const sql = `
            SELECT 
                eartag, 
                MIN(record_date) AS First_time, 
                MAX(record_date) AS Last_record, 
                DATEDIFF(MAX(record_date), MIN(record_date)) AS days_between, 
                (MAX(weight) - MIN(weight)) / NULLIF(DATEDIFF(MAX(record_date), MIN(record_date)), 0) AS average_all_time
            FROM 
                monthly_weight
            WHERE 
                eartag = ?
            GROUP BY 
                eartag;
        `;
        return db.query(sql, [eartag], callback);
    },
    
    
    deleteWeight: function(record_id, callback) {
        return db.query('DELETE FROM monthly_weight WHERE record_id = ?', [record_id], callback);
    }
};

module.exports = MonthlyWeight;
