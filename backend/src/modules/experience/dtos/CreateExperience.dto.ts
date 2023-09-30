import { IsIn, IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

import IsOptional from "@decorators/isOptional.decorator";

export default class CreateExperienceDTO {
	@IsNumber({}, { each: true })
	exp!: number | number[];

	@IsOptional()
	@IsNumber()
	@Min(1)
	level?: number;

	@IsString()
	@IsNotEmpty()
	@IsIn(["Character"])
	type!: string;
}
