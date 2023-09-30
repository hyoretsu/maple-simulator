import { EquipmentRequirements } from "@prisma/client";
import { IsNumber, IsString, Min } from "class-validator";

import IsOptional from "@decorators/isOptional.decorator";

export default class EquipmentRequirementDTO implements Partial<EquipmentRequirements> {
	@IsOptional()
	@IsNumber()
	@Min(0)
	dex?: number;

	@IsOptional()
	@IsNumber()
	@Min(0)
	int?: number;

	@IsOptional()
	@IsString()
	job?: string;

	@IsOptional()
	@IsNumber()
	@Min(0)
	level?: number;

	@IsOptional()
	@IsNumber()
	@Min(0)
	luk?: number;

	@IsOptional()
	@IsNumber()
	@Min(0)
	str?: number;
}
