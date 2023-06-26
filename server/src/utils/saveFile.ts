import { execData } from './execData';

const fs = require('fs');
export const saveFile = async (db, dbName) => {
    try {
        const res = await db.save();
        fs.writeFileSync(`./src/assets/kdbx/${dbName}.kdbx`, Buffer.from(res));
        execData(dbName);
    } catch (err) {
        console.log(err);
    }
};
