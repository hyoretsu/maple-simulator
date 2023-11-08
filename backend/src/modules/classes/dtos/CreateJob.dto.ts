import { Job } from "@prisma/client";
import { IsInt, IsNotEmpty, IsNumber, IsString, IsUUID, Min } from "class-validator";

import IsOptional from "@decorators/isOptional.decorator";

export default class CreateJobDTO implements Partial<Omit<Job, "classId">> {
	@IsOptional()
	@IsString()
	class?: string;

	@IsOptional()
	@IsString()
	@IsUUID()
	classId?: string;

	@IsNotEmpty()
	@IsInt()
	@Min(0)
	id!: number;

	@IsNotEmpty()
	@IsString()
	name!: string;

	@IsNotEmpty()
	@IsString()
	icon!: string;

	@IsNumber()
	@IsNotEmpty()
	@Min(1)
	iconHeight!: number;

	@IsNumber()
	@IsNotEmpty()
	@Min(1)
	iconWidth!: number;
}
