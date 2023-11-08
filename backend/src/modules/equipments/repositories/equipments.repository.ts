import { EquipmentSet, Icon, Prisma } from "@prisma/client";

import CreateEquipmentDTO from "../dtos/CreateEquipment.dto";
import CreateSetDTO from "../dtos/CreateSet.dto";

export type CompleteEquipment = Prisma.EquipmentGetPayload<{
	include: {
		icon: true;
		req: true;
		set: true;
		stats: true;
	};
}>;

export type CompleteSet = Prisma.EquipmentSetGetPayload<{
	include: {
		bonuses: true;
	};
}>;

export default abstract class EquipmentsRepository {
	abstract create(data: Omit<CreateEquipmentDTO, "setName">): Promise<CompleteEquipment>;
	abstract createSet(data: CreateSetDTO): Promise<CompleteSet>;
	abstract findAll(): Promise<CompleteEquipment[]>;
	abstract findById(id: number): Promise<CompleteEquipment | null>;
	abstract findManyById(id: number[]): Promise<CompleteEquipment[]>;
	abstract findManyByJob(job: string): Promise<CompleteEquipment[]>;
	abstract findSetById(id: number): Promise<EquipmentSet | null>;
	abstract findSetByName(name: string): Promise<EquipmentSet | null>;
}
