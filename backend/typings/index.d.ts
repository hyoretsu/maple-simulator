export type { Class } from "@prisma/client";

import { CompleteEquipment } from "../src/modules/equipments/repositories/equipments.repository";
import { EntityWithIconUrl } from "../src/utils/addIconUrl";

type Equipment = Required<EntityWithIconUrl<CompleteEquipment>>;

export type { Equipment };
