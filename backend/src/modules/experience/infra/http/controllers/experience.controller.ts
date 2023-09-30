import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { Experience } from "@prisma/client";

import CreateExperienceDTO from "@modules/experience/dtos/CreateExperience.dto";
import CreateExperience from "@modules/experience/services/CreateExperience.service";
import ListExperience from "@modules/experience/services/ListExperience.service";

@Controller("exp")
export default class ExperienceController {
	constructor(private createExperience: CreateExperience, private listExperience: ListExperience) {}

	@Get()
	async getExperience(@Query("type") type: string): Promise<Experience[]> {
		const exp = await this.listExperience.execute(type);

		return exp;
	}

	@Post()
	async postExperience(@Body() body: CreateExperienceDTO): Promise<Experience | void> {
		const exp = await this.createExperience.execute(body);

		return exp;
	}
}
