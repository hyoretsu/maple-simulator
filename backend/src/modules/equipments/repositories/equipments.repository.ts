import { Prisma } from "@prisma/client";

import CreateEquipmentDTO from "../dtos/CreateEquipment.dto";

export type CompleteEquipment = Prisma.EquipmentGetPayload<{
	include: {
		req: true;
		stats: true;
	};
}>;

export default abstract class EquipmentsRepository {
	abstract create(data: CreateEquipmentDTO): Promise<CompleteEquipment>;
	abstract findAll(): Promise<CompleteEquipment[]>;
	abstract findById(id: number): Promise<CompleteEquipment | null>;
	abstract findManyById(id: number[]): Promise<CompleteEquipment[]>;
	abstract findManyByJob(job: string): Promise<CompleteEquipment[]>;
}
