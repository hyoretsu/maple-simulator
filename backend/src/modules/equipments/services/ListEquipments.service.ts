import { Injectable } from "@nestjs/common";

import addIconUrl, { EntityWithIconUrl } from "@utils/addIconUrl";
import EquipmentsRepository, { CompleteEquipment } from "../repositories/equipments.repository";

@Injectable()
export default class ListEquipments {
	constructor(private equipmentsRepository: EquipmentsRepository) {}

	async execute(): Promise<EntityWithIconUrl<CompleteEquipment>[]> {
		const equips = await this.equipmentsRepository.findAll();

		return equips.map(equip => addIconUrl(equip));
	}
}
