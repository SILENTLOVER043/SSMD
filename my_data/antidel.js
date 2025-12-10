// codes by silent lover (updated for auto ON)

const { DATABASE } = require('../lib/database');
const { DataTypes } = require('sequelize');

const AntiDelDB = DATABASE.define('AntiDelete', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: false,
        defaultValue: 1,
    },
    gc_status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true, // ✔ Default ON
    },
    dm_status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true, // ✔ Default ON
    },
}, {
    tableName: 'antidelete',
    timestamps: false,
    hooks: {
        beforeCreate: record => { record.id = 1; },
        beforeBulkCreate: records => {
            records.forEach(record => { record.id = 1; });
        },
    },
});

let isInitialized = false;

// ================================================
// ✔ Always ON at Startup (GC + DM both TRUE)
// ================================================
async function initializeAntiDeleteSettings() {
    if (isInitialized) return;
    try {
        await AntiDelDB.sync();

        // If no record exists → create with ON settings
        await AntiDelDB.findOrCreate({
            where: { id: 1 },
            defaults: { gc_status: true, dm_status: true }, // ✔ Always ON
        });

        isInitialized = true;
    } catch (error) {
        console.error('Error initializing anti-delete settings:', error);
    }
}

// ================================================
// ✔ Set single status (gc or dm)
// ================================================
async function setAnti(type, status) {
    try {
        await initializeAntiDeleteSettings();
        const record = await AntiDelDB.findByPk(1);

        if (type === 'gc') record.gc_status = status;
        else if (type === 'dm') record.dm_status = status;

        await record.save();
        return true;
    } catch (error) {
        console.error('Error setting anti-delete status:', error);
        return false;
    }
}

// ================================================
// ✔ Get single type
// ================================================
async function getAnti(type) {
    try {
        await initializeAntiDeleteSettings();
        const record = await AntiDelDB.findByPk(1);

        return type === 'gc'
            ? record.gc_status
            : record.dm_status;

    } catch (error) {
        console.error('Error getting anti-delete status:', error);
        return false;
    }
}

// ================================================
// ✔ Get both statuses
// ================================================
async function getAllAntiDeleteSettings() {
    try {
        await initializeAntiDeleteSettings();
        const record = await AntiDelDB.findByPk(1);

        return [{
            gc_status: record.gc_status,
            dm_status: record.dm_status,
        }];
    } catch (error) {
        console.error('Error retrieving anti-delete settings:', error);
        return [];
    }
}

module.exports = {
    AntiDelDB,
    initializeAntiDeleteSettings,
    setAnti,
    getAnti,
    getAllAntiDeleteSettings,
};