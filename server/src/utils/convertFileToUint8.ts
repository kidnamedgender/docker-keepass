const fs = require('fs');

export const convertFileToUint8 = (dbName) => {
    const getByteArray = (filePath) => {
        const fileData = fs.readFileSync(filePath).toString('hex');
        const byteArray = [];
        for (let i = 0; i < fileData.length; i += 2)
            byteArray.push('0x' + fileData[i] + '' + fileData[i + 1]);
        return byteArray;
    };

    const byteArray = getByteArray(`./src/assets/kdbx/${dbName}.kdbx`);

    const byteToUint8Array = (byteArray) => {
        const uint8Array = new Uint8Array(byteArray.length);
        for (let i = 0; i < uint8Array.length; i++) {
            uint8Array[i] = byteArray[i];
        }
        return uint8Array;
    };

    const uint8Array: Uint8Array = byteToUint8Array(byteArray);

    return uint8Array;
};
