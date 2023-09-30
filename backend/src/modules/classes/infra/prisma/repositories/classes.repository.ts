import { Injectable } from "@nestjs/common";
import { Class } from "@prisma/client";

import PrismaService from "@database/prisma.service";

import CreateClasseDTO from "@modules/classes/dtos/CreateClass.dto";
import ClassesRepository from "@modules/classes/repositories/classes.repository";

@Injectable()
export default class PrismaClassesRepository implements ClassesRepository {
	constructor(private prisma: PrismaService) {}

	public async create(data: CreateClasseDTO): Promise<Class> {
		const classes = await this.prisma.class.create({
			data,
		});

		return classes;
	}
}
