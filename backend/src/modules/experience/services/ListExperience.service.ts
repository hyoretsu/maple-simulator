import { Injectable } from "@nestjs/common";
import { Experience } from "@prisma/client";

import ExperienceRepository from "../repositories/experience.repository";
import { JsonFixBigInt } from "@hyoretsu/utils";

@Injectable()
export default class ListExperience {
	constructor(private experienceRepository: ExperienceRepository) {}

	public async execute(type?: string): Promise<Experience[]> {
		let expList: Experience[];

		if (type) {
			expList = await this.experienceRepository.findManyByType(type);
		} else {
			expList = await this.experienceRepository.findAll();
		}

		expList = expList.map((exp) => JsonFixBigInt(exp));

		return expList;
	}
}
