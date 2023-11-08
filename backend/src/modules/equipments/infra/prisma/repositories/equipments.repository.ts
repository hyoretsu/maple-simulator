import { Injectable } from "@nestjs/common";
import { EquipmentSet } from "@prisma/client";

import PrismaService from "@database/prisma.service";

import CreateEquipmentDTO from "@modules/equipments/dtos/CreateEquipment.dto";
import EquipmentsRepository, {
	CompleteEquipment,
	CompleteSet,
} from "@modules/equipments/repositories/equipments.repository";
import CreateSetDTO from "@modules/equipments/dtos/CreateSet.dto";

@Injectable()
export default class PrismaEquipmentsRepository implements EquipmentsRepository {
	constructor(private prisma: PrismaService) {}

	public async create({
		icon: file,
		iconHeight: height,
		iconWidth: width,
		req,
		setId,
		stats,
		...data
	}: Omit<CreateEquipmentDTO, "setName">): Promise<CompleteEquipment> {
		const equip = await this.prisma.equipment.create({
			data: {
				...data,
				req: { create: req },
				set: {
					connect: {
						id: setId,
					},
				},
				stats: { create: stats },
				icon: {
					create: {
						file,
						height,
						width,
					},
				},
			},
			include: {
				icon: true,
				req: true,
				set: true,
				stats: true,
			},
		});

		return equip as CompleteEquipment;
	}

	public async createSet({ bonuses, ...data }: CreateSetDTO): Promise<CompleteSet> {
		const set = await this.prisma.equipmentSet.create({
			data: {
				...data,
				bonuses: {
					createMany: { data: bonuses },
				},
			},
			include: {
				bonuses: true,
			},
		});

		return set;
	}

	public async findAll(): Promise<CompleteEquipment[]> {
		const equips = await this.prisma.equipment.findMany({
			include: {
				icon: true,
				req: true,
				set: true,
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
				icon: true,
				req: true,
				set: true,
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
				icon: true,
				req: true,
				set: true,
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
				icon: true,
				req: true,
				set: true,
				stats: true,
			},
			orderBy: {
				id: "asc",
			},
		});

		return equips;
	}

	public async findSetById(id: number): Promise<EquipmentSet | null> {
		const set = await this.prisma.equipmentSet.findUnique({ where: { id } });

		return set;
	}

	public async findSetByName(name: string): Promise<EquipmentSet | null> {
		const set = await this.prisma.equipmentSet.findUnique({ where: { name } });

		return set;
	}
}
