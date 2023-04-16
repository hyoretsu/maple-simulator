import { EquipmentStats } from "@prisma/client";
import { IsNumber, IsString, Min } from "class-validator";

import IsOptional from "@decorators/isOptional.decorator";

export default class EquipmentStatDTO implements Partial<EquipmentStats> {
	@IsOptional()
	@IsNumber()
    @Min(0)
	att?: number;

	@IsOptional()
	@IsNumber()
    @Min(0)
	bossDmg?: number;

	@IsOptional()
	@IsNumber()
    @Min(0)
	def?: number;

	@IsOptional()
	@IsNumber()
    @Min(0)
	dex?: number;

	@IsOptional()
	@IsNumber()
    @Min(0)
	hp?: number;

	@IsOptional()
	@IsNumber()
    @Min(0)
	ied?: number;

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
	jump?: number;

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
	matt?: number;

	@IsOptional()
	@IsNumber()
    @Min(0)
	mp?: number;

	@IsOptional()
	@IsNumber()
    @Min(0)
	speed?: number;

	@IsOptional()
	@IsNumber()
    @Min(0)
	str?: number;
}
