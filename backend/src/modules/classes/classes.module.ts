import { Module } from "@nestjs/common";

import PrismaService from "@database/prisma.service";

import ClassesController from "./infra/http/controllers/classes.controller";
import PrismaClassesRepository from "./infra/prisma/repositories/classes.repository";
import ClassesRepository from "./repositories/classes.repository";
import CreateClass from "./services/CreateClass.service";
import CreateJob from "./services/CreateJob.service";
import JobsRepository from "./repositories/jobs.repository";
import PrismaJobsRepository from "./infra/prisma/repositories/jobs.repository";

@Module({
	controllers: [ClassesController],
	providers: [
		PrismaService,
		{
			provide: ClassesRepository,
			useClass: PrismaClassesRepository,
		},
		{
			provide: JobsRepository,
			useClass: PrismaJobsRepository,
		},
		...[CreateClass, CreateJob],
	],
})
export default class ClassesModule {}
