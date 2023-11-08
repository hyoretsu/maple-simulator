import { Injectable } from "@nestjs/common";

import addIconUrl, { EntityWithIconUrl } from "@utils/addIconUrl";
import CreateEquipmentDTO from "../dtos/CreateEquipment.dto";
import EquipmentsRepository, { CompleteEquipment } from "../repositories/equipments.repository";
import { EquipmentSet } from "@prisma/client";

@Injectable()
export default class CreateEquipment {
	constructor(private equipmentsRepository: EquipmentsRepository) {}

	async execute({
		setId,
		setName,
		...data
	}: CreateEquipmentDTO): Promise<EntityWithIconUrl<CompleteEquipment>> {
		let set: EquipmentSet | null = {} as EquipmentSet;
		if (setName) {
			set = await this.equipmentsRepository.findSetByName(setName);
		}

		const equip = await this.equipmentsRepository.create({
			...data,
			setId: set?.id || setId,
		});

		return addIconUrl(equip);
	}
}
