import { Injectable } from "@nestjs/common";

import PrismaService from "@database/prisma.service";

import CreateEquipmentDTO from "@modules/equipments/dtos/CreateEquipment.dto";
import EquipmentsRepository, {
	CompleteEquipment,
} from "@modules/equipments/repositories/equipments.repository";

@Injectable()
export default class PrismaEquipmentsRepository implements EquipmentsRepository {
	constructor(private prisma: PrismaService) {}

	public async create({ req, stats, ...data }: Required<CreateEquipmentDTO>): Promise<CompleteEquipment> {
		const equip = await this.prisma.equipment.create({
			data: {
				...data,
				req: { create: req },
				stats: { create: stats },
			},
			include: {
				req: true,
				stats: true,
			},
		});

		return equip;
	}

	public async findAll(): Promise<CompleteEquipment[]> {
		const equips = await this.prisma.equipment.findMany({
			include: {
				req: true,
				stats: true,
			},
			orderBy: {
				id: "asc",
			},
		});

		return equips;
	}

	public async findById(id: number): Promise<CompleteEquipment | null> {
		const equip = await this.prisma.equipment.findUnique({
			where: {
				id,
			},
			include: {
				req: true,
				stats: true,
			},
		});

		return equip;
	}

	public async findManyById(id: number[]): Promise<CompleteEquipment[]> {
		const equips = await this.prisma.equipment.findMany({
			where: {
				id: { in: id },
			},
			include: {
				req: true,
				stats: true,
			},
			orderBy: {
				id: "asc",
			},
		});

		return equips;
	}

	public async findManyByJob(job: string): Promise<CompleteEquipment[]> {
		if (job === "Beginner") job = "";

		const equips = await this.prisma.equipment.findMany({
			where: {
				req: {
					OR: [{ job }, { job: "" }],
				},
			},
			include: {
				req: true,
				stats: true,
			},
			orderBy: {
				id: "asc",
			},
		});

		return equips;
	}
}
