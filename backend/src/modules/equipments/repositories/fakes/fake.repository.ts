import EquipmentsRepository, { CompleteEquipment, CompleteSet } from "../equipments.repository";
import CreateEquipmentDTO from "../../dtos/CreateEquipment.dto";
import CreateSetDTO from "@modules/equipments/dtos/CreateSet.dto";
import { randomUUID } from "crypto";
import { EquipmentSet } from "@prisma/client";

export default class FakeEquipmentsRepository implements EquipmentsRepository {
	private equips: CompleteEquipment[] = [];
	private sets: CompleteSet[] = [];

	public async create(data: CreateEquipmentDTO): Promise<CompleteEquipment> {
		const equip = data as CompleteEquipment;

		this.equips.push(equip);

		return equip;
	}

	public async createSet({ bonuses, ...data }: CreateSetDTO): Promise<CompleteSet> {
		const set = data as CompleteSet;
		bonuses.forEach(bonus => {
			set.bonuses.push({
				...bonus,
				id: randomUUID(),
				setId: set.id,
			});
		});

		this.sets.push(set);

		return set;
	}

	public async findAll(): Promise<CompleteEquipment[]> {
		return this.equips;
	}

	public async findById(id: number): Promise<CompleteEquipment | null> {
		const equip = this.equips.find(equip => equip.id === id) || null;

		return equip;
	}

	public async findManyById(id: number[]): Promise<CompleteEquipment[]> {
		const equip = this.equips.filter(equip => id.includes(equip.id));

		return equip;
	}

	public async findManyByJob(job: string): Promise<CompleteEquipment[]> {
		if (job === "Beginner") job = "";

		const equips = this.equips.filter(equip => equip.req?.job === job || equip.req?.job === "");

		return equips;
	}

	public async findSetById(id: number): Promise<EquipmentSet | null> {
		const set = this.sets.find(set => set.id === id) || null;

		return set;
	}

	public async findSetByName(name: string): Promise<EquipmentSet | null> {
		const set = this.sets.find(set => set.name === name) || null;

		return set;
	}
}
