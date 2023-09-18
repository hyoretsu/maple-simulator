export type { Class } from "@prisma/client";

import { CompleteEquipment } from "../src/modules/equipments/repositories/equipments.repository";

type Equipment = Required<CompleteEquipment>;

export type { Equipment };
