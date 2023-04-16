import { Injectable } from "@nestjs/common";

import transformItem from "@utils/transformItem";
import EquipmentsRepository, { CompleteEquipment } from "../repositories/equipments.repository";

@Injectable()
export default class ListEquipments {
	constructor(private equipmentsRepository: EquipmentsRepository) {}

	async execute(): Promise<CompleteEquipment[]> {
		const equips = await this.equipmentsRepository.findAll();

		return equips.map((equip) => transformItem(equip));
	}
}
