import { Injectable } from "@nestjs/common";
import { Experience } from "@prisma/client";

import PrismaService from "@database/prisma.service";

import ExperienceRepository, {
	ExperienceCreateManyParams,
	ExperienceCreateParams,
} from "@modules/experience/repositories/experience.repository";

@Injectable()
export default class PrismaExperienceRepository implements ExperienceRepository {
	constructor(private prisma: PrismaService) {}

	public async create(data: ExperienceCreateParams): Promise<Experience> {
		const exp = await this.prisma.experience.create({
			data,
		});

		return exp;
	}

	public async createMany({ exp: givenExp, type }: ExperienceCreateManyParams): Promise<void> {
		await this.prisma.experience.createMany({
			data: givenExp.map((exp, index) => ({
				exp,
				level: index + 1,
				type,
			})),
			skipDuplicates: true,
		});
	}

	public async findAll(): Promise<Experience[]> {
		const exp = await this.prisma.experience.findMany();

		return exp;
	}

	public async findManyByType(type: string): Promise<Experience[]> {
		const exp = await this.prisma.experience.findMany({
			where: { type },
			orderBy: { level: "asc" },
		});

		return exp;
	}
}
