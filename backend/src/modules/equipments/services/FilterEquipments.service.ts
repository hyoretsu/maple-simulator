import { Injectable } from "@nestjs/common";

import FilterEquipmentsDTO from "../dtos/FilterEquipments.dto";
import EquipmentsRepository, { CompleteEquipment } from "../repositories/equipments.repository";
import addIconUrl, { EntityWithIconUrl } from "@utils/addIconUrl";

@Injectable()
export default class FilterEquipments {
	constructor(private equipmentsRepository: EquipmentsRepository) {}

	public async execute({ job, type }: FilterEquipmentsDTO): Promise<EntityWithIconUrl<CompleteEquipment>[]> {
		const equipsByJob = await this.equipmentsRepository.findManyByJob(job);
		const equipsByJobAndType = equipsByJob.filter(equip => equip.type === type);

		if (type) {
			return equipsByJobAndType.map(equip => addIconUrl(equip));
		}

		return equipsByJob.map(equip => addIconUrl(equip));
	}
}
