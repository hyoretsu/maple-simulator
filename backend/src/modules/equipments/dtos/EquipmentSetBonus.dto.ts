import { EquipmentSetBonus } from "@prisma/client";
import { IsNumber, IsOptional, Min } from "class-validator";

export default class EquipmentSetBonusDTO implements Partial<EquipmentSetBonus> {
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
	critDmg?: number;

	@IsOptional()
	@IsNumber()
    @Min(0)
	critRate?: number;

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
	dmg?: number;

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
	str?: number;
}
