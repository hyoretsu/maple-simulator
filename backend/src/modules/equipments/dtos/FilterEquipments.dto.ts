import IsOptional from "@decorators/isOptional.decorator";
import { IsNotEmpty, IsString } from "class-validator";

export default class FilterEquipmentsDTO {
	@IsString()
    @IsNotEmpty()
	job!: string;

	@IsOptional()
    @IsString()
	type?: string;
}
