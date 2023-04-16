import { JsonFixBigInt } from "@hyoretsu/utils";
import { BadRequestException, Injectable } from "@nestjs/common";
import { Experience } from "@prisma/client";

import CreateExperienceDTO from "../dtos/CreateExperience.dto";
import ExperienceRepository from "../repositories/experience.repository";

@Injectable()
export default class CreateExperience {
	constructor(private experienceRepository: ExperienceRepository) {}

	public async execute({ exp, level, type }: CreateExperienceDTO): Promise<Experience | void> {
		if (Array.isArray(exp)) {
			await this.experienceRepository.createMany({ exp: exp as unknown as bigint[], type });

			return;
		}

		if (!level) {
			throw new BadRequestException("Level is required when EXP is a single number");
		}

		return JsonFixBigInt(
			await this.experienceRepository.create({
				exp: exp as unknown as bigint,
				level: level as number,
				type,
			}),
		);
	}
}
