import { Module } from "@nestjs/common";

import PrismaService from "@database/prisma.service";

import ClassesController from "./infra/http/controllers/classes.controller";
import PrismaClassesRepository from "./infra/prisma/repositories/classes.repository";
import ClassesRepository from "./repositories/classes.repository";
import CreateClass from "./services/CreateClass.service";

@Module({
	controllers: [ClassesController],
	providers: [
		PrismaService,
		{
			provide: ClassesRepository,
			useClass: PrismaClassesRepository,
		},
		...[CreateClass],
	],
})
export default class ClassesModule {}
