import { Class } from "@prisma/client";
import { IsNotEmpty, IsString } from "class-validator";

export default class CreateEquipmentDTO implements Partial<Class> {
	@IsString()
	@IsNotEmpty()
	name!: string;
}
