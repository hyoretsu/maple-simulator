import { Module } from "@nestjs/common";

import PrismaService from "@database/prisma.service";

import ExperienceController from "./infra/http/controllers/experience.controller";
import PrismaExperienceRepository from "./infra/prisma/repositories/experience.repository";
import ExperienceRepository from "./repositories/experience.repository";
import CreateExperience from "./services/CreateExperience.service";
import ListExperience from "./services/ListExperience.service";

@Module({
	controllers: [ExperienceController],
	providers: [
		PrismaService,
		{
			provide: ExperienceRepository,
			useClass: PrismaExperienceRepository,
		},
		...[CreateExperience, ListExperience],
	],
})
export default class ExperienceModule {}
