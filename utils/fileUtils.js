// utils/fileUtils.js
const fs = require('fs').promises;

const readData = async (path) => {
    try {
        const data = await fs.readFile(path, 'utf-8');
        return JSON.parse(data);
    } catch (err) {
        if (err.code === 'ENOENT') return [];
        throw err;
    }
};

const writeData = async (path, data) => {
    try {
        await fs.writeFile(path, JSON.stringify(data, null, 2));
    } catch (err) {
        throw err;
    }
};

module.exports = { readData, writeData };
