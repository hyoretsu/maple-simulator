import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import CreateSetDTO from "../dtos/CreateSet.dto";
import EquipmentsRepository, { CompleteSet } from "../repositories/equipments.repository";

@Injectable()
export default class CreateSet {
	constructor(private equipmentsRepository: EquipmentsRepository) {}

	public async execute({ bonuses, id, name }: CreateSetDTO): Promise<CompleteSet> {
		const sameIdSet = await this.equipmentsRepository.findSetById(id);
		if (sameIdSet) {
			throw new HttpException("There's already a set with this ID.", HttpStatus.FORBIDDEN);
		}

		const sameNameSet = await this.equipmentsRepository.findSetByName(name);
		if (sameNameSet) {
			throw new HttpException("There's already a set with this name.", HttpStatus.FORBIDDEN);
		}

		const set = await this.equipmentsRepository.createSet({ bonuses, id, name });

		return set;
	}
}
