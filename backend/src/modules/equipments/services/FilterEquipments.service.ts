import { Injectable } from "@nestjs/common";

import FilterEquipmentsDTO from "../dtos/FilterEquipments.dto";
import EquipmentsRepository, { CompleteEquipment } from "../repositories/equipments.repository";
import transformItem from "@utils/transformItem";

@Injectable()
export default class FilterEquipments {
	constructor(private equipmentsRepository: EquipmentsRepository) {}

	public async execute({ job, type }: FilterEquipmentsDTO): Promise<CompleteEquipment[]> {
		const equipsByJob = await this.equipmentsRepository.findManyByJob(job);
		const equipsByJobAndType = equipsByJob.filter((equip) => equip.type === type);

		if (type) {
			return equipsByJobAndType.map((equip) => transformItem(equip));
		}

		return equipsByJob.map((equip) => transformItem(equip));
	}
}
