import { IsNotEmpty, IsNumber } from "class-validator";

export default class FindEquipmentDTO {
	@IsNumber({}, { each: true })
    @IsNotEmpty()
	id!: number | number[];
}
