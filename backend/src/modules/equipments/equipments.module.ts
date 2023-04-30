import { Module } from "@nestjs/common";

import PrismaService from "@database/prisma.service";

import EquipmentsController from "./infra/http/controllers/equipments.controller";
import PrismaEquipmentsRepository from "./infra/prisma/repositories/equipments.repository";
import EquipmentsRepository from "./repositories/equipments.repository";
import CreateEquipment from "./services/CreateEquipment.service";
import CreateSet from "./services/CreateSet.service";
import ListEquipments from "./services/ListEquipments.service";
import FilterEquipments from "./services/FilterEquipments.service";
import FindEquipments from "./services/FindEquipments.service";

@Module({
	controllers: [EquipmentsController],
	providers: [
		PrismaService,
		{
		provide: EquipmentsRepository,
		useClass: PrismaEquipmentsRepository,
		},
		...[CreateEquipment, CreateSet, FilterEquipments, FindEquipments, ListEquipments],
	],
})
export default class EquipmentsModule {}
