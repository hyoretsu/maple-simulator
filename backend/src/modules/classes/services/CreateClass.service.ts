import { Injectable } from "@nestjs/common";
import { Class } from "@prisma/client";

import CreateClassDTO from "../dtos/CreateClass.dto";
import ClassesRepository from "../repositories/classes.repository";

@Injectable()
export default class CreateClass {
    constructor(private classesRepository: ClassesRepository) {}

    public async execute(data: CreateClassDTO): Promise<Class> {
        const newClass = await this.classesRepository.create(data);

        return newClass;
    }
}
