import { EquipmentSet, EquipmentSetBonus } from "@prisma/client";
import { ArrayMinSize, IsArray, IsNotEmpty, IsNumber, IsString, Min, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

import EquipmentSetBonusDTO from "./EquipmentSetBonus.dto";

export default class CreateSetDTO implements EquipmentSet {
	@IsNumber()
	@IsNotEmpty()
	@Min(0)
	id!: number;

	@IsString()
	@IsNotEmpty()
	name!: string;

	@IsArray()
	@ValidateNested({ each: true })
	@ArrayMinSize(1)
	@Type(() => EquipmentSetBonusDTO)
	bonuses!: EquipmentSetBonus[];
}
