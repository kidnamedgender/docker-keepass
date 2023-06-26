import { Body, Controller, Post } from '@nestjs/common';

import { AppService } from './app.service';

import { DBDto } from './dto/DB.dto';
import { EntityDto } from './dto/Entity.dto';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Post('create_db')
    createFile(@Body() body: DBDto): Promise<void> {
        return this.appService.createFile(body);
    }

    @Post('create_entity')
    createEntity(@Body() body: EntityDto): Promise<void> {
        return this.appService.createEntity(body);
    }
}
