import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

import * as kdbxweb from 'kdbxweb';
import { argon2 } from './support/argon2';

import { config } from 'dotenv';

config();

const bootstrap = async () => {
    try {
        const app = await NestFactory.create(AppModule);
        await app.listen(process.env.PORT);

        // имплементация argon2 (для поддержки kdbx4)
        kdbxweb.CryptoEngine.setArgon2Impl(argon2);

        console.log('Сервер работает на порту: ' + process.env.PORT);
    } catch (err) {
        console.log(err);
    }
};

bootstrap();
