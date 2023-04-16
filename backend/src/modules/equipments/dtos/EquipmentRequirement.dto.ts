import { EquipmentRequirements } from "@prisma/client";
import { IsNumber, IsString, Min } from "class-validator";

import IsOptional from "@decorators/isOptional.decorator";

export default class EquipmentRequirementDTO implements Partial<EquipmentRequirements> {
	@IsNumber()
    @Min(0)
	dex!: number;

	@IsNumber()
    @Min(0)
	int!: number;

	@IsOptional()
    @IsString()
	job?: string;

	@IsNumber()
    @Min(0)
	level!: number;

	@IsNumber()
    @Min(0)
	luk!: number;

	@IsNumber()
    @Min(0)
	str!: number;
}
