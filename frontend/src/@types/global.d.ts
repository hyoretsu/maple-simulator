import { EquipmentRequirements, EquipmentStats, Equipment as PrismaEquipment } from "@prisma/client";

declare global {
	type BooleanString = "true" | "false";

	type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

	type Equipment = PrismaEquipment & {
		req: EquipmentRequirements;
		stats: EquipmentStats;
	};
}
