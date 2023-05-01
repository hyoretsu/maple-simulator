import { Equipment as PrismaEquipment, EquipmentRequirements, EquipmentStats } from "@prisma/client";

declare global {
	type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

	type Equipment = PrismaEquipment & {
		req: EquipmentRequirements;
		stats: EquipmentStats;
	};
}
