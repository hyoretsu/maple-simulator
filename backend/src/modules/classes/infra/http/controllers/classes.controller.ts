import { Body, Controller, Post } from "@nestjs/common";
import { Class } from "@prisma/client";

import CreateClassDTO from "@modules/classes/dtos/CreateClass.dto";
import CreateClass from "@modules/classes/services/CreateClass.service";

@Controller("classes")
export default class ClassesController {
    constructor(private createClass: CreateClass) {}

    @Post()
    async postClasses(@Body() body: CreateClassDTO): Promise<Class> {
        const newClass = await this.createClass.execute(body);

        return newClass;
    }
}
