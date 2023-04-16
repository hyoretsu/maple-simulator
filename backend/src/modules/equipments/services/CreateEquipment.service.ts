import { Injectable } from "@nestjs/common";

import transformItem from "@utils/transformItem";
import CreateEquipmentDTO from "../dtos/CreateEquipment.dto";
import EquipmentsRepository, { CompleteEquipment } from "../repositories/equipments.repository";

@Injectable()
export default class CreateEquipment {
	constructor(private equipmentsRepository: EquipmentsRepository) {}

	async execute(data: CreateEquipmentDTO): Promise<CompleteEquipment> {
		const equip = await this.equipmentsRepository.create(data);

		return transformItem(equip);
	}
}
