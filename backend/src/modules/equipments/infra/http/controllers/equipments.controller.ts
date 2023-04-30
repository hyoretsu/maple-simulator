import { Body, Controller, Get, Post } from "@nestjs/common";

import Multipart from "@decorators/multipart.decorator";
import CreateEquipmentDTO from "@modules/equipments/dtos/CreateEquipment.dto";
import CreateSetDTO from "@modules/equipments/dtos/CreateSet.dto";
import FindEquipmentDTO from "@modules/equipments/dtos/FindEquipment.dto";
import { CompleteEquipment } from "@modules/equipments/repositories/equipments.repository";
import CreateEquipment from "@modules/equipments/services/CreateEquipment.service";
import CreateSet from "@modules/equipments/services/CreateSet.service";
import FindEquipments from "@modules/equipments/services/FindEquipments.service";
import ListEquipments from "@modules/equipments/services/ListEquipments.service";
import FilterEquipmentsDTO from "@modules/equipments/dtos/FilterEquipments.dto";
import FilterEquipments from "@modules/equipments/services/FilterEquipments.service";

@Controller("equips")
export default class EquipmentsController {
	constructor(
		private createEquip: CreateEquipment,
		private createSet: CreateSet,
		private filterEquips: FilterEquipments,
		private findEquips: FindEquipments,
		private listEquips: ListEquipments,
	) {}

	@Get()
	async getEquips(): Promise<CompleteEquipment[]> {
		const equips = await this.listEquips.execute();

		return equips;
	}

	@Post()
	async postEquips(
		@Multipart({
            fields: ["icon"],
            validation: CreateEquipmentDTO
        })
		body: CreateEquipmentDTO,
	): Promise<CompleteEquipment> {
		const equip = await this.createEquip.execute(body);

		return equip;
	}

	@Post("filter")
	async postFilterEquips(@Body() body: FilterEquipmentsDTO) {
		const equips = await this.filterEquips.execute(body);

		return equips;
	}

	@Post("find")
	async postFindEquips( @Body() body: FindEquipmentDTO) {
		const equips = await this.findEquips.execute(body);

		return equips;
	}

	@Post("set")
	async postEquipSets(@Body() body: CreateSetDTO) {
		const set = await this.createSet.execute(body);

		return set;
	}
}
