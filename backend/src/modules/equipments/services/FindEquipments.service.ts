import { Injectable } from "@nestjs/common";

import transformItem from "@utils/transformItem";
import FindEquipmentDTO from "../dtos/FindEquipment.dto";
import EquipmentsRepository, { CompleteEquipment } from "../repositories/equipments.repository";

@Injectable()
export default class FindEquipments {
	constructor(private equipmentsRepository: EquipmentsRepository) {}

	public async execute({ id }: FindEquipmentDTO): Promise<CompleteEquipment | CompleteEquipment[]> {
		if (typeof id === "number") {
			const equip = await this.equipmentsRepository.findById(id);
			if (!equip) {
				return null as any;
			}

			return transformItem(equip);
		}

		const equips = await this.equipmentsRepository.findManyById(id);

		return equips.map((equipment) => transformItem(equipment));
	}
}
