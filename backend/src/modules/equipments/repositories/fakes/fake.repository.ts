import EquipmentsRepository, { CompleteEquipment } from "../equipments.repository";
import CreateEquipmentDTO from "../../dtos/CreateEquipment.dto";

export default class FakeEquipmentsRepository implements EquipmentsRepository {
	private equips: CompleteEquipment[] = [];

	public async create(data: CreateEquipmentDTO): Promise<CompleteEquipment> {
		const equip = data as CompleteEquipment;

		this.equips.push(equip);

		return equip;
	}

	public async findAll(): Promise<CompleteEquipment[]> {
		return this.equips;
	}

	public async findById(id: number): Promise<CompleteEquipment | null> {
		const equip = this.equips.find((equip) => equip.id === id) || null;

		return equip;
	}

	public async findManyById(id: number[]): Promise<CompleteEquipment[]> {
		const equip = this.equips.filter((equip) => id.includes(equip.id));

		return equip;
	}

	public async findManyByJob(job: string): Promise<CompleteEquipment[]> {
		if (job === "Beginner") job = "";

		const equips = this.equips.filter((equip) => equip.req?.job === job || equip.req?.job === "");

		return equips;
	}
}
