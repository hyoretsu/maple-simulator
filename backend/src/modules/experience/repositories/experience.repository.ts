import { Experience } from "@prisma/client";

import CreateExperienceDTO from "../dtos/CreateExperience.dto";

export interface ExperienceCreateParams extends Required<Omit<CreateExperienceDTO, "exp">> {
	exp: bigint;
	level: number;
}

export interface ExperienceCreateManyParams extends Omit<CreateExperienceDTO, "exp" | "level"> {
	exp: bigint[];
	type: string;
}

export default abstract class ExperienceRepository {
	abstract create(data: ExperienceCreateParams): Promise<Experience>;
	abstract createMany(data: ExperienceCreateManyParams): Promise<void>;
	abstract findAll(): Promise<Experience[]>;
	abstract findManyByType(type: string): Promise<Experience[]>;
}
