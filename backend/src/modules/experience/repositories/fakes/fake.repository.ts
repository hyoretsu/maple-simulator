import { Experience } from "@prisma/client";

import ExperienceRepository, {
	ExperienceCreateManyParams,
	ExperienceCreateParams,
} from "../experience.repository";

export default class FakeExperienceRepository implements ExperienceRepository {
	private exp: Experience[] = [];

	public async create(data: ExperienceCreateParams): Promise<Experience> {
		const exp = data as Experience;

		this.exp.push(exp);

		return exp;
	}

	public async createMany({ type, ...data }: ExperienceCreateManyParams): Promise<void> {
		data.exp.forEach((exp, index) => {
			this.exp.push({
				exp,
				level: index + 1,
				type,
			});
		});
	}

	public async findAll(): Promise<Experience[]> {
		return this.exp;
	}

	public async findManyByType(type: string): Promise<Experience[]> {
		return this.exp.filter(exp => exp.type === type);
	}
}
