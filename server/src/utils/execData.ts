import { exec } from 'child_process';

export const execData = async (dbName) => {
    try {
        await exec(
            `sudo docker cp ./src/assets/kdbx/${dbName}.kdbx keepassxc:/home`,
        );
    } catch (err) {
        console.error(err);
    }
};
