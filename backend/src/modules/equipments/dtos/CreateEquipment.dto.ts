import { EquipmentRequirements, EquipmentStats } from "@prisma/client";
import { Type } from "class-transformer";
import { IsBoolean, IsIn, IsNotEmpty, IsNumber, IsString, Min, ValidateNested } from "class-validator";

import IsOptional from "@decorators/isOptional.decorator";
import EquipmentRequirementDTO from "./EquipmentRequirement.dto";
import EquipmentStatDTO from "./EquipmentStat.dto";
import { CompleteEquipment } from "../repositories/equipments.repository";

export default class CreateEquipmentDTO implements Partial<Omit<CompleteEquipment, "icon">> {
	@IsOptional()
	@IsNumber()
	attackSpeed?: number;

	@IsOptional()
	@IsBoolean()
	bossReward?: boolean;

	@IsOptional()
	@IsString()
	category?: string;

	@IsNotEmpty()
	@IsNumber()
	@Min(0)
	enhancements!: number;

	@IsString()
	@IsNotEmpty()
	icon!: string;

	@IsNumber()
	@IsNotEmpty()
	@Min(1)
	iconHeight!: number;

	@IsNumber()
	@IsNotEmpty()
	@Min(1)
	iconWidth!: number;

	@IsNumber()
	@Min(0)
	@IsNotEmpty()
	id!: number;

	@IsString()
	@IsNotEmpty()
	name!: string;

	@ValidateNested()
	@Type(() => EquipmentRequirementDTO)
	req?: EquipmentRequirements;

	@IsOptional()
	@IsNumber()
	@Min(0)
	setId?: number;

	@IsOptional()
	@IsString()
	setName?: string;

	@ValidateNested()
	@Type(() => EquipmentStatDTO)
	stats?: EquipmentStats;

	@IsString()
	@IsIn([
		"Android",
		"Badge",
		"Belt",
		"Book",
		"Bottom",
		"Cape",
		"Dragon",
		"Earrings",
		"Emblem",
		"Eye Accessory",
		"Face Accessory",
		"Gloves",
		"Hat",
		"Heart",
		"Mechanic",
		"Medal",
		"Pendant",
		"Pocket",
		"Ring",
		"Secondary",
		"Shoes",
		"Shoulder",
		"Top",
		"Totem",
		"Weapon",
	])
	type!: string;
}
