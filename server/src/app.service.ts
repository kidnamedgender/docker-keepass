import { Injectable } from '@nestjs/common';

import * as kdbxweb from 'kdbxweb';
import generateHash from 'random-hash';

import { DBDto } from './dto/DB.dto';
import { EntityDto } from './dto/Entity.dto';

import { convertFileToUint8 } from './utils/convertFileToUint8';
import { saveFile } from './utils/saveFile';

@Injectable()
export class AppService {
    async createFile(body: DBDto): Promise<void> {
        // создание входных данных (мастер ключ)
        const credentials = new kdbxweb.Credentials(
            kdbxweb.ProtectedValue.fromString(body.MasterKey),
        );

        // создание базы
        const hashName = generateHash({ length: 12 });
        const db = kdbxweb.Kdbx.create(
            credentials,
            body.DBName + '_' + hashName,
        );

        // поддержка kdbx4
        db.setVersion(4);

        // сохранение файла базы данных
        saveFile(db, body.DBName + '_' + hashName);
    }

    async createEntity(body: EntityDto): Promise<void> {
        const credentials = new kdbxweb.Credentials(
            kdbxweb.ProtectedValue.fromString(body.DBPassword),
        );

        // конвертирование файла kdbx в uint8
        const uint8Array = convertFileToUint8(body.DBName);

        let buf: string | ArrayBuffer | ArrayLike<string> = new Uint8Array(
            uint8Array,
        ).toString();
        buf = new Uint8Array(buf['split'](',')).buffer;

        // "подключение" к базе данных (загрузка существующей)
        const db = await kdbxweb.Kdbx.load(buf, credentials);
        // создание сущности
        const entry = db.createEntry(db.getDefaultGroup());

        // заполнение сущности пользовательскими данными
        for (const col in body) {
            entry.fields.set(col, kdbxweb.ProtectedValue.fromString(body[col]));
        }

        // фиксация изменений
        entry.pushHistory();
        entry.times.update();

        saveFile(db, body.DBName);
    }
}
